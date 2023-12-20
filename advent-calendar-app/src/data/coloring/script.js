import $ from 'jquery';
import { TweenMax } from 'gsap'; // Assuming TweenMax is from gsap


export function run() {  
  if (document.getElementById("ActivityDIV")) return;
  const container = document.getElementById('coloring');  

  var mainHolder, colorHolder
  var btnRandom
  var svgObject, svgOutline, svgColor 
  var swatchUp, swatchDown
  var fillSpeed = 0.15
  var chosenColor = '#FFFFFF'
  var colors = ['#1d561c', '#699b68', '#61ce73', '#afe89a', '#e9edb2', '#efe77b',
   '#f4d24f', '#bc9d71', '#08316d', '#265a8b', '#5da4ba', '#7ad0d3', '#e7b6af',
    '#faca9a', '#fe8d7d', '#9b6959', '#552056', '#874a9e', '#b595e5', '#b33a6d',
     '#e2649e', '#ec8a8e', '#fd6d4a', '#7c373f']
  var closeOffset  

  // Check and create required DOM elements
  const ensureDOMElements = (container) => {
    var activity_div, buttonsDiv, heldDiv;
    if (!document.getElementById('ActivityDIV')) {
      activity_div = document.createElement("div");
      activity_div.id = "ActivityDIV";      
    
      buttonsDiv = document.createElement("div");
      buttonsDiv.classList.add("buttons");      
    
      var random_btn = document.createElement('button');
      random_btn.id = "btnRandom";
      random_btn.textContent = "Random";
      random_btn.classList.add("button");
      buttonsDiv.appendChild(random_btn);

      var download_btn = document.createElement('button');
      download_btn.id = "btnDownloadSVG";
      download_btn.textContent = "Download";
      download_btn.classList.add("button");
      buttonsDiv.appendChild(download_btn);

      container.appendChild(buttonsDiv);            
      container.appendChild(activity_div);
    }   
  };

  ensureDOMElements(container);

  $.fn.makeSVGcolor = function(svgURL) {
    mainHolder = this
    $( this ).load(svgURL, function() {
      svgObject  = $('svg', this)
      svgColor   = $('g#Color', svgObject).children()
      svgOutline = $('g:nth-child(1)', svgObject).children()
      $(svgColor).on('click', colorMe)
      $(mainHolder).makeSwatches()
      $('.swatchHolder').addClass('gray')
    });
  }

 $.fn.btnRandom    = function() {
    btnRandom = this
    $(btnRandom).on('click', svgRandom)
  }
  
  function swatchClick(){
    chosenColor = $(this).data('color')
    TweenMax.to(colorHolder, fillSpeed, { backgroundColor:chosenColor })
  }
  function swatchMove(e){
    isSwatchHolderVisible = !isSwatchHolderVisible;
    var moveTo = isSwatchHolderVisible ? swatchUp: swatchDown;
    TweenMax.to('.swatchHolder', 0.5, moveTo);
  }
  
  function colorMe() { 
    TweenMax.to(this, fillSpeed, { fill: chosenColor });
  }
  
  function colorRollover(e){
    var rollover = (e.type == 'mouseenter')? {scale:1.2}:{scale:1};
    TweenMax.to($(this), 0.05, rollover); 
  }
  
  function download() {
    console.log("Downloading");
    const container = document.querySelector("#coloring");
    if (container) {
      var svgElement = container.querySelector('svg');
      if (svgElement) {
        var serializer = new XMLSerializer();
        var svgString = serializer.serializeToString(svgElement);
        var blob = new Blob([svgString], {type: "image/svg+xml"});
        var url = URL.createObjectURL(blob);
  
        var dl = document.createElement("a");
        document.body.appendChild(dl); 
        dl.setAttribute("href", url);
        dl.setAttribute("download", "coloringpage.svg");
        dl.click();
        document.body.removeChild(dl); // Clean up
        URL.revokeObjectURL(url); // Free up memory
      }
    }
  }
  
   function svgRandom() {
    $(svgColor).each(function(){
      var randomNum = Math.floor((Math.random() * colors.length) + 1);
      TweenMax.to(this, fillSpeed, { fill: colors[randomNum] });
    })
  }
  function svgClear() {
    $(svgColor).each(function(){
      TweenMax.to(this, fillSpeed, { fill: "#FFF" });
    })
  }


  $.fn.btnDownloadSVG = download;
  
  var isSwatchHolderVisible = false; // Track visibility state
  $.fn.makeSwatches = function() {
    var swatchHolder = $('<ol/>', {'class': 'swatchHolder'}).appendTo(this)
        colorHolder  = $('<li/>', {'class': 'colorHolder', 'text':'Palette'}).css('background-color', chosenColor).appendTo(swatchHolder)

    $.each(colors, function() {
      var swatch = $('<li/>').appendTo(swatchHolder)
      $(swatch).css('background-color', this)
      $(swatch).data('color', this)
      $(swatch).on('click', swatchClick)
      $(swatch).on('mouseenter mouseleave', colorRollover)
    })

    var swatchPos = $('.colorHolder').position()
    var swatchHeight = $('.colorHolder').outerHeight(true) + swatchPos.top
    closeOffset = swatchHeight - $('.swatchHolder').outerHeight()

    $('.colorHolder').on('click', swatchMove);
    $('.swatchHolder').css('bottom',closeOffset)
    swatchUp   = {css:{bottom:0}}
    swatchDown = {css:{bottom:closeOffset}}
  } 
  $('#ActivityDIV').makeSVGcolor('/advent/coloringpage.svg')          
  $('#btnRandom'     ).btnRandom()  
  $('#btnDownloadSVG'      ).off('click');
  $('#btnDownloadSVG'      ).on('click', download);
}
