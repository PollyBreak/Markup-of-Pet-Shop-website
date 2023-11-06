document.addEventListener('DOMContentLoaded', () => {
  const puzzleSize = 3;
  const puzzleHighliht = '#000099';
  var ctx, canvas, img, pieces, mainWidth, mainHeight, pieceWidth, pieceHeight, currentPiece, currentDroppedPiece, mouse;
  var count = 0, maxCount = 0, gamesCount = 0;

  function init() {
    img = new Image();
    var screenWidth = window.innerWidth;
    if (screenWidth > 550) {
      img.src = "/img/main-qimg-1a81d936933b949a8d4e9be3430fcaf9-c.jpg";
      img.addEventListener('load',onImage,false);
      document.getElementById("puzzleDiv").style.display='flex';
    }
    else {

    }
  }
  window.addEventListener('resize', function () {
    var screenWidth = window.innerWidth;
    if (screenWidth > 600) {
      img.src = "/img/main-qimg-1a81d936933b949a8d4e9be3430fcaf9-c.jpg";
      img.addEventListener('load',onImage,false)
      document.getElementById("puzzleDiv").style.display='flex';
    }
    else {
      document.getElementById("puzzleDiv").style.display='none'
    }
  });

  function onImage (e) {
    pieceWidth = Math.floor (img.width/puzzleSize)
    pieceHeight = Math.floor (img.height/puzzleSize)
    mainWidth = pieceWidth * puzzleSize;
    mainHeight = pieceHeight * puzzleSize;
    setCanvas();
    initPuzzle();
  }

  function setCanvas(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width=mainWidth;
    canvas.height=mainHeight;
    canvas.style.border="1px solid blue";
  }
  function initPuzzle(){
    pieces = [];
    mouse = {x:0,y:0};
    currentPiece = null;
    currentDroppedPiece = null;
    ctx.drawImage(img, 0, 0, mainWidth, mainHeight, 0, 0, mainWidth, mainHeight);
    if (!gamesCount) createTitle("Click me to start!");
    buildPieces();
  }
  function createTitle (msg) {
    ctx.fillStyle = "#000000";
    ctx.globalAlpha = .5;
    // ctx.fillRect (100,mainHeight - 40,mainWidth - 200,40);
    ctx.fillStyle = "#FFFFFF";
    ctx.globalAlpha = 1;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "20px Arial";
    ctx.fillText(msg,mainWidth / 2,mainHeight - 20);
  }
  function buildPieces(){
    var i, piece, xPos = 0, yPos = 0;
    for (i = 0;i < puzzleSize * puzzleSize;i++) {
      piece = {}; piece.sx = xPos; piece.sy = yPos; pieces.push(piece);
      xPos += pieceWidth;
      if (xPos >= mainWidth) {
        xPos = 0; yPos += pieceHeight;
      }
    }
    document.onmousedown = shufflePuzzle;
  }
  function shufflePuzzle() {
    pieces = shuffleArray(pieces);
    ctx.clearRect(0,0,mainWidth,mainHeight);
    var i, piece, xPos = 0, yPos = 0;
    for (i = 0;i < pieces.length;i++) {
      piece = pieces[i]; piece.xPos = xPos; piece.yPos = yPos;
      ctx.drawImage (img, piece.sx, piece.sy, pieceWidth, pieceHeight, xPos, yPos, pieceWidth, pieceHeight);
      ctx.strokeRect (xPos, yPos, pieceWidth,pieceHeight);
      xPos += pieceWidth;
      if (xPos >= mainWidth){
        xPos = 0; yPos += pieceHeight;
      }
    }
    document.onmousedown = onPuzzleClick;
  }
  function onPuzzleClick(e){
    if (e.layerX || e.layerX == 0){
      mouse.x = e.layerX - canvas.offsetLeft;
      mouse.y = e.layerY - canvas.offsetTop;
    }
    else if(e.offsetX || e.offsetX == 0) {
      mouse.x = e.offsetX - canvas.offsetLeft;
      mouse.y = e.offsetY - canvas.offsetTop;
    }
    currentPiece = checkPieceClicked();
    if (currentPiece != null) {
      ctx.clearRect (currentPiece.xPos,currentPiece.yPos,pieceWidth,pieceHeight);
      ctx.save();
      ctx.globalAlpha = .9;
      ctx.drawImage (img, currentPiece.sx, currentPiece.sy, pieceWidth, pieceHeight,
        mouse.x - (pieceWidth / 2), mouse.y - (pieceHeight / 2), pieceWidth, pieceHeight);
      ctx.restore();
      document.onmousemove = updatePuzzle;
      document.onmouseup = pieceDropped;
    }
  }
  function checkPieceClicked() {
    var i, piece;
    for (i = 0;i < pieces.length;i++) {
      piece = pieces[i];
      if (mouse.x < piece.xPos || mouse.x > (piece.xPos + pieceWidth) ||
        mouse.y < piece.yPos || mouse.y > (piece.yPos + pieceHeight)) {
        //часть картинки не кликнута
      }
      else return piece;
    }
    return null;
  }
  function updatePuzzle (e) {
    currentDroppedPiece = null;
    if (e.layerX || e.layerX == 0) {
      mouse.x = e.layerX - canvas.offsetLeft;
      mouse.y = e.layerY - canvas.offsetTop;
    }
    else if(e.offsetX || e.offsetX == 0) {
      mouse.x = e.offsetX - canvas.offsetLeft;
      mouse.y = e.offsetY - canvas.offsetTop;
    }
    ctx.clearRect (0,0,mainWidth,mainHeight);
    var i, piece;
    for (i = 0;i < pieces.length;i++) {
      piece = pieces[i];
      if (piece == currentPiece) continue;
      ctx.drawImage (img, piece.sx, piece.sy, pieceWidth, pieceHeight, piece.xPos, piece.yPos, pieceWidth, pieceHeight);
      ctx.strokeRect (piece.xPos, piece.yPos, pieceWidth,pieceHeight);
      if (currentDroppedPiece == null){
        if (mouse.x < piece.xPos || mouse.x > (piece.xPos + pieceWidth) ||
          mouse.y < piece.yPos || mouse.y > (piece.yPos + pieceHeight)) {
          //мшь не поверх картинки
        }
        else {
          currentDroppedPiece = piece;
          ctx.save();
          ctx.globalAlpha = .33;
          ctx.fillStyle = puzzleHighliht;
          ctx.fillRect(currentDroppedPiece.xPos,currentDroppedPiece.yPos,pieceWidth, pieceHeight);
          ctx.restore();
        }
      }
    }
    ctx.save();
    ctx.globalAlpha = .66;
    ctx.drawImage(img, currentPiece.sx, currentPiece.sy, pieceWidth, pieceHeight,
      mouse.x - (pieceWidth / 2), mouse.y - (pieceHeight / 2), pieceWidth, pieceHeight);
    ctx.restore();
    ctx.strokeRect( mouse.x - (pieceWidth / 2), mouse.y - (pieceHeight / 2), pieceWidth,pieceHeight);
  }
  function pieceDropped (e) {
    document.onmousemove = null;
    document.onmouseup = null;
    if (currentDroppedPiece != null) {
      var tmp = {xPos:currentPiece.xPos,yPos:currentPiece.yPos};
      currentPiece.xPos = currentDroppedPiece.xPos;
      currentPiece.yPos = currentDroppedPiece.yPos;
      currentDroppedPiece.xPos = tmp.xPos;
      currentDroppedPiece.yPos = tmp.yPos;
      count++;
    }
    resetPuzzleAndCheckWin();
  }
  function resetPuzzleAndCheckWin() {
    ctx.clearRect (0,0,mainWidth,mainHeight);
    var gameWin = true;
    var i, piece;
    for (i = 0;i < pieces.length;i++) {
      piece = pieces[i];
      ctx.drawImage(img, piece.sx, piece.sy, pieceWidth, pieceHeight, piece.xPos, piece.yPos, pieceWidth, pieceHeight);
      ctx.strokeRect(piece.xPos, piece.yPos, pieceWidth,pieceHeight);
      if (piece.xPos != piece.sx || piece.yPos != piece.sy) {
        gameWin = false;
      }
    }
    if (gameWin) {
      setTimeout(gameOver,330);
    }
  }
  function gameOver(){
    document.onmousedown = null;
    document.onmousemove = null;
    document.onmouseup = null;
    gamesCount++;
    initPuzzle();
    if (maxCount == 0) maxCount = count;
    createTitle ('Extra promocode: "I love puzzles"');
    if (count < maxCount) maxCount = count;
    count = 0;
  }
  function shuffleArray (o) {
    for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  }


  init();

});
