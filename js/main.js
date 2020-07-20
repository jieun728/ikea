$(window).load(function(){

  visualEffect()

  mainMenu()

  campingEffect()

  snsEffect()
})

function mainMenu(){

  var $headerWrap=$("#header_wrap")
  var $headerColor=$("#header_color")
  var $mainMenu=$("#mainmenu_list").children().children("a")

  $(".submenu").eq(1).css({"height":125})

  $headerWrap.on("mouseenter",colorOver)
  $headerWrap.on("mouseleave",colorOut)

  $mainMenu.on("mouseenter focus",mainMenuOver)
  $headerWrap.on("mouseleave",mainMenuOut)

  function mainMenuOver(){
    $headerColor.show()
    $(".submenu").hide()
    $(this).next().slideDown(350,"easeOutCubic")
  }
  function mainMenuOut(){
    $(".submenu").slideUp(350,"easeOutCubic")
  }

  function colorOver(){
    $headerColor.hide()
    $headerColor.stop()
    $headerColor.slideDown(350,"easeOutCubic")
  }
  function colorOut(){
    $headerColor.stop()
    $headerColor.slideUp(350,"easeOutCubic")
  }

//floating menu
  var currentScrollHeight
  var newScrollHeight

  currentScrollHeight=$(document).scrollTop()

  $(window).on("scroll",windowScroll)

  function windowScroll(){
    newScrollHeight=$(document).scrollTop()

    if(newScrollHeight-currentScrollHeight>0){
      $("#header_wrap:not(:animated)").animate({"top":-130},300,"easeOutCubic")
    }else{
      $("#header_wrap:not(:animated)").animate({"top":0},300,"easeOutCubic")
    }

    if(currentScrollHeight>130){
      $headerWrap.off("mouseleave",colorOut)
      $headerWrap.off("mouseenter",colorOver)
      $headerColor.show()
    }else{
      colorOut()
      $headerWrap.on("mouseleave",colorOut)
      $headerWrap.on("mouseenter",colorOver)
    }
    currentScrollHeight=newScrollHeight
  }

  //shopping
  $("#utility_list").children().eq(2).on("mouseenter",yellow)
  $("#utility_list").children().eq(2).on("mouseleave",white)

  function yellow(){
    $(this).addClass("shopping")
  }
  function white(){
    $(this).removeClass("shopping")
  }

}

function visualEffect(){
  var $visualWrap
  var $visualList
  var $visualLi
  var $text
  var $dot
  var visualWidth
  var visualNum
  var timer
  var selectNum

  init()
  reset()

  $(window).on("resize",reset)
  $dot.on("mouseenter",dotOver)
  $dot.on("mouseleave",slideStart)
  
  slideStart()

  function autoPlay(){
    selectNum++
    if(selectNum>=visualNum){
      selectNum=0
    }
    showDot(selectNum)
    visualSlide(selectNum)
  }
  function init(){
    $visualWrap=$("#visual_wrap")
    $visualList=$("#visual_list")
    $visualLi=$visualList.children()
    $text=$("#visual_list_text").children()
    $dot=$("#dot_list").children()
    visualNum=$visualLi.size()
    selectNum=0
    $text.eq(0).show()
    $text.eq(0).css({"opacity":1,"left":0})
  }
  function reset(){
    visualWidth=$(window).innerWidth()
    $visualWrap.css({"width":visualWidth})
    $visualList.css({"width":visualWidth*visualNum})
    $visualLi.css({"width":visualWidth})
    $visualWrap.css({"height":$(window).innerHeight()+$("#header_wrap").innerHeight()})
  }
  function dotOver(){
    clearInterval(timer)

    selectNum=$dot.index($(this))

    visualSlide(selectNum)
    showDot(selectNum)
  }
  function showDot(num){
    $dot.removeClass("selected")
    $dot.eq(num).addClass("selected")
  }
  function visualSlide(num){
    $text.css({"opacity":0,"left":700})
    $visualList.stop()
    $visualList.animate({"left":-visualWidth*num},1000,"easeInSine",function(){
      $text.hide()
      $text.eq(num).css({"opacity":0,"left":700})
      $text.eq(num).show()
      $text.eq(num).animate({"opacity":1,"left":0},800,"easeInSine")
    })
  }
  function slideStart(){
    timer=setInterval(autoPlay,3700)
  }
}

function campingEffect(){
  var $img=$("#camping_list").children()
  var scrollHeight

  $(window).on("scroll",windowScroll)
  $img.on("mouseenter",mouseOver)
  $img.on("mouseleave",mouseOut)

  function windowScroll(){
    scrollHeight=$(document).scrollTop()
    
    if(scrollHeight>=$("#camping_wrap").offset().top){
      $img.eq(0).animate({"top":0,"opacity":1},700,"easeOutCubic")
      $img.eq(1).animate({"top":0,"opacity":1},700,"easeOutCubic")
    }if(scrollHeight>=$("#camping_wrap").offset().top+$img.innerHeight()/2){
      $img.eq(2).animate({"top":0,"opacity":1},700,"easeOutCubic")
      $img.eq(3).animate({"top":0,"opacity":1},700,"easeOutCubic")
    }

  }

  function mouseOver(){
    $(this).children().children().show()
    $(this).children().children().stop()
    $(this).children().children().animate({"opacity":1},500,"easeOutCubic")

  }
  function mouseOut(){
    $(this).children().children().stop()
    $(this).children().children().animate({"opacity":0},500,"easeOutCubic",function(){
      $(this).hide()
    })

  }
  
}

function snsEffect(){
  var scrollHeight
  var img=$("#sns_list").children()

  for(i=0; i<img.length; i++){
    img.eq(i).css({"left":0+(i*280)})
  }

  $(window).on("scroll",windowScroll)

  function windowScroll(){
    scrollHeight=$(document).scrollTop()
    if(scrollHeight>$("#sns_inner").offset().top-$(window).innerHeight()/2){
      for(var i=0; i<img.length; i++){
        img.eq(i).animate({"bottom":0},500+(i*300),"easeOutCubic")
      }
    }
  }
}
