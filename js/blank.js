(() => {
  let yoffset = 0;//현재 스크롤된 높이
  let prevScrollHeight = 0; // 이전 씬의 총 높이
  let currentScene = 0;//현재 활성화된 씬
  let currnet = 0;
  let acc = 0.1;
  let rafId;
  let rafState = false;
  const sceneInfo=[
    //0
    {
      type: 'sticky',
      scrollHeight: 0,
      heightNum: 5,
      objs: {
        container : document.querySelector('#scroll-section-0'),
        messageA: document.querySelector('#scroll-section-0 .main-message.a'),
        messageB: document.querySelector('#scroll-section-0 .main-message.b'),
        messageC: document.querySelector('#scroll-section-0 .main-message.c'),
        messageD: document.querySelector('#scroll-section-0 .main-message.d'),
        canvas: document.querySelector('#video-canvas-0'),
        context: document.querySelector('#video-canvas-0').getContext('2d'),
        videoImage: []
      },
      //모든 애니메이션 정보를 담음
      values:{
        //이미지의 갯수
        videoImageCount : 300,
        imageSequence: [0,299],
        //message A
        messageA_opacity_in : [0,1,{ start : 0.1, end: 0.2 }],
        messageA_opacity_out : [1,0,{ start : 0.25, end: 0.3 }],
        messageA_translate_in: [20,0, { start: 0.1,end: 0.2 }],
        messageA_translate_out: [0,-20, { start: 0.25,end: 0.3 }],
        //message B
        messageB_opacity_in : [0,1,{ start : 0.3, end: 0.4 }],
        messageB_opacity_out : [1,0,{ start : 0.45, end: 0.5 }],
        messageB_translate_in: [20,0, { start: 0.3,end: 0.4 }],
        messageB_translate_out: [0,-20, { start: 0.45,end: 0.5 }],
        //message C
        messageC_opacity_in : [0,1,{ start : 0.5, end: 0.6 }],
        messageC_opacity_out : [1,0,{ start : 0.65, end: 0.7 }],
        messageC_translate_in: [20,0, { start: 0.5,end: 0.6 }],
        messageC_translate_out: [0,-20, { start: 0.65,end: 0.7 }],
        //message D
        messageD_opacity_in : [0,1,{ start : 0.7, end: 0.8 }],
        messageD_opacity_out : [1,0,{ start : 0.85, end: 0.9 }],
        messageD_translate_in: [20,0, { start: 0.7,end: 0.8 }],
        messageD_translate_out: [0,-20, { start: 0.85,end: 0.9 }],
        //canvas_Opacity
        canvas_opacity_out : [1,0,{ start:0.9, end: 1 }],
      }
    },
    //1
    {
      type: 'normal',
      scrollHeight: 0,
      objs: {
        container : document.querySelector('#scroll-section-1'),
      }
    },
    //2
    {
      type: 'sticky',
      scrollHeight: 0,
      heightNum: 5,
      objs: {
        container : document.querySelector('#scroll-section-2'),
        messageA: document.querySelector('#scroll-section-2 .main-message.a'),
        messageB: document.querySelector('#scroll-section-2 .desc-message.b'),
        messageC: document.querySelector('#scroll-section-2 .desc-message.c'),
        pinB: document.querySelector('#scroll-section-2 .b .pin'),
        pinC: document.querySelector('#scroll-section-2 .c .pin'),
        canvas: document.querySelector('#video-canvas-1'),
        context: document.querySelector('#video-canvas-1').getContext('2d'),
        videoImage: []
      },
      values: {
        //이미지의 갯수
        videoImageCount : 960,
        imageSequence: [0,959],
        //messageA
        messageA_opacity_in: [0,1,{ start: 0.25, end: 0.3 }],
        messageA_opacity_out: [1,0,{ start: 0.4, end: 0.45 }],
        messageA_translate_in: [20,0,{ start: 0.15, end: 0.2 }],
        messageA_translate_out: [0,-20,{ start: 0.4, end: 0.45 }],
        //messageB
        messageB_opacity_in: [0,1,{ start: 0.6, end: 0.65 }],
        messageB_opacity_out: [1,0,{ start: 0.68, end: 0.73 }],
        messageB_translate_in: [30,0,{ start: 0.6, end: 0.65 }],
        messageB_translate_out: [0,-20,{ start: 0.68, end: 0.73 }],
        //messageC
        messageC_opacity_in: [0,1,{ start: 0.87, end: 0.92 }],
        messageC_opacity_out: [1,0,{ start: 0.95, end: 1 }],
        messageC_translate_in: [30,0,{ start: 0.87, end: 0.92 }],
        messageC_translate_out: [0,-20,{ start: 0.95, end: 1 }],
        //pin
        pinB_scaleY: [0.5, 1, { start: 0.6, end: 0.65 }],
        pinC_scaleY: [0.5, 1, { start: 0.87, end: 0.92 }],
        //canvas_Opacity
        canvas_opacity_in: [0, 1, { start: 0, end: 0.1 }],
				canvas_opacity_out: [1, 0, { start: 0.95, end: 1 }],
      },
    },
    //3
    {
      type: 'sticky',
      scrollHeight: 0,
      heightNum: 5,
      objs: {
        container : document.querySelector('#scroll-section-3'),
        canvasCaption: document.querySelector('.canvas-caption'),
        canvas: document.querySelector('.imgae-blend-canvas'),
        context: document.querySelector('.imgae-blend-canvas').getContext('2d'),
        imagesPath: [
          './images/blend-image-1.jpg',
          './images/blend-image-2.jpg',
        ],
        images:[]
      },
      values:{
        //화면의 크기가 모두 다르기 때문에 스크롤 할떄 계산함
        rect1X: [ 0, 0, { start: 0, end: 0 }],
        rect2X: [ 0, 0, { start: 0, end: 0 }],
        blendHeight: [0,0,{ start: 0, end: 0 }],
        canvas_scale: [0,0,{ start: 0, end: 0 }],
        reactStartY: 0,
        caption_translateY : [20,0,{ start: 0, end: 0 }],
        caption_opacity : [0,1,{ start: 0, end: 0 }]
      }
    },
  ]
  //상단 헤더메뉴 고정 함수
  function checkMenu(){
    if( yoffset > 44 ){
      document.body.classList.add('local-nav-sticky');
    }else{
      document.body.classList.remove('local-nav-sticky');
    }
  }

  function setCanvasImages(){
    let imgElem;
    let imgElem2;
    let imgElem3;
    for(let i =0; i < sceneInfo[0].values.videoImageCount; i++){
      //이미지 객체 새성
      imgElem = new Image;
      imgElem.src = `./video/001/IMG_${6726 + i}.JPG`;
      sceneInfo[0].objs.videoImage.push(imgElem);
    }

    for(let i =0; i < sceneInfo[2].values.videoImageCount; i++){
        //이미지 객체 새성
        imgElem2 = new Image;
        imgElem2.src = `./video/002/IMG_${7027 + i}.JPG`;
        sceneInfo[2].objs.videoImage.push(imgElem2);
    }

    for( let i =0; i < sceneInfo[3].objs.imagesPath.length; i++ ){
      //이미지 객체 새성
      imgElem3 = new Image;
      imgElem3.src = sceneInfo[3].objs.imagesPath[i];
      sceneInfo[3].objs.images.push(imgElem3);
    }
    
    
  }

  function setLayout(){
    const heightRatio = window.innerHeight / 1080;
    
    //각 스크롤 섹션의 높이 세팅
    for(let i =0; i < sceneInfo.length; i++){
      if( sceneInfo[i].type === 'sticky' ){
        sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      }else{
        sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
      }
      sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }

    let totalScrollHeight = 0;
    yoffset = window.pageYOffset;

    for(let i =0; i < sceneInfo.length; i++){
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if( totalScrollHeight >= yoffset ){
        currentScene = i;
        break;
      }
    }
    document.querySelector('body').id = `show-scene-${currentScene}`


    sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%,-50%,0) scale(${heightRatio})`;
    sceneInfo[2].objs.canvas.style.transform = `translate3d(-50%,-50%,0) scale(${heightRatio})`;
  }


//values = 값 변화의 시작과 끝, 현재 씬의 높이 비율 currentYoffset = 현재 씬의 스크롤한 높이
//scrollRatio = 현재 씬의 스크롤 비율
  function calcValues(values,currnetYoffset){
    let rv;
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    let scrollRatio = currnetYoffset / scrollHeight;
    //start와 end의 원소가 있는 배열의 적용
    if( values.length === 3 ){
      const partScrollStart = values[2].start * scrollHeight;
      const partScrollEnd = values[2].end * scrollHeight;
      const partScrollHeight = partScrollEnd - partScrollStart;
      if( currnetYoffset >= partScrollStart && currnetYoffset <= partScrollEnd ){
        rv =  (currnetYoffset - partScrollStart)  / partScrollHeight * (values[1] - values[0]) + values[0];
      }else if( currnetYoffset < partScrollStart ){
        rv = values[0];
      }else if(currnetYoffset > partScrollEnd){
        rv = values[1];
      }
    }else{
      rv =  scrollRatio * (values[1] - values[0]) + values[0];
    }
    return rv;
  }


  function playAnimation(){
    const currnetYoffset = yoffset - prevScrollHeight;
    const values = sceneInfo[currentScene].values;
    const objs = sceneInfo[currentScene].objs;
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currnetYoffset / scrollHeight;

    if( currnetYoffset < 0 ) return;
    switch (currentScene){
      case 0:
        // let sequence = parseInt(calcValues(values.imageSequence,currnetYoffset));
        // objs.context.drawImage(objs.videoImage[sequence],0,0);
        objs.canvas.style.opacity = calcValues(values.canvas_opacity_out,currnetYoffset);
        if( scrollRatio <= 0.22 ){
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_in,currnetYoffset);
          objs.messageA.style.transform = `translateY(${calcValues(values.messageA_translate_in,currnetYoffset)}%)`;
        }else{
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_out,currnetYoffset);
          objs.messageA.style.transform = `translateY(${calcValues(values.messageA_translate_out,currnetYoffset)}%)`;
        }

        if( scrollRatio <= 0.42 ){
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_in,currnetYoffset);
          objs.messageB.style.transform = `translateY(${calcValues(values.messageB_translate_in,currnetYoffset)}%)`;
        }else{
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_out,currnetYoffset);
          objs.messageB.style.transform = `translateY(${calcValues(values.messageB_translate_out,currnetYoffset)}%)`;
        }

        if( scrollRatio <= 0.62 ){
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_in,currnetYoffset);
          objs.messageC.style.transform = `translateY(${calcValues(values.messageC_translate_in,currnetYoffset)}%)`;
        }else{
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_out,currnetYoffset);
          objs.messageC.style.transform = `translateY(${calcValues(values.messageC_translate_out,currnetYoffset)}%)`;
        }

        if( scrollRatio <= 0.82 ){
          objs.messageD.style.opacity = calcValues(values.messageD_opacity_in,currnetYoffset);
          objs.messageD.style.transform = `translateY(${calcValues(values.messageD_translate_in,currnetYoffset)}%)`;
        }else{
          objs.messageD.style.opacity = calcValues(values.messageD_opacity_out,currnetYoffset);
          objs.messageD.style.transform = `translateY(${calcValues(values.messageD_translate_out,currnetYoffset)}%)`;
        }
        
        break;
      case 1:
        break;
      case 2:
        // let sequence2 = parseInt(calcValues(values.imageSequence,currnetYoffset));
        // objs.context.drawImage(objs.videoImage[sequence2],0,0);

				if (scrollRatio <= 0.5) {
					// in
					objs.canvas.style.opacity = calcValues(values.canvas_opacity_in, currnetYoffset);
				} else {
					// out
					objs.canvas.style.opacity = calcValues(values.canvas_opacity_out, currnetYoffset);
				}


        if( scrollRatio <= 0.32 ){
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_in,currnetYoffset);
          objs.messageA.style.transform = `translateY(${calcValues(values.messageA_translate_in,currnetYoffset)}%)`;
        }else{
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_out,currnetYoffset);
          objs.messageA.style.transform = `translateY(${calcValues(values.messageA_translate_out,currnetYoffset)}%)`;
        }

        if( scrollRatio <= 0.67 ){
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_in,currnetYoffset);
          objs.messageB.style.transform = `translateY(${calcValues(values.messageB_translate_in,currnetYoffset)}%)`;
        }else{
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_out,currnetYoffset);
          objs.messageB.style.transform = `translateY(${calcValues(values.messageB_translate_out,currnetYoffset)}%)`;
        }

        if( scrollRatio <= 0.93 ){
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_in,currnetYoffset);
          objs.messageC.style.transform = `translateY(${calcValues(values.messageC_translate_in,currnetYoffset)}%)`;
        }else{
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_out,currnetYoffset);
          objs.messageC.style.transform = `translateY(${calcValues(values.messageC_translate_out,currnetYoffset)}%)`;
        }

        if( scrollRatio > 0.9 ){
          const objs = sceneInfo[3].objs;
          const values = sceneInfo[3].values;
          //스크롤 하며 가로 / 세로 모두 꽉 차게 하기 위해 세팅
          const widthRatio = window.innerWidth / objs.canvas.width;
          const heightRatio = window.innerHeight / objs.canvas.height;
          let canvasScaleRatio = 0;
          if( widthRatio <= heightRatio ){
            canvasScaleRatio = heightRatio;
          }else{
            canvasScaleRatio = widthRatio;
          }

          objs.canvas.style.transform = `scale(${canvasScaleRatio})`;
          objs.context.drawImage(objs.images[0],0,0);
          objs.context.fillStyle = 'white';

          //캔버스 사이즈에 맞춰 가정한 innerWidth와 innerHeight
          //현재 창 사이즈에서 보이는 캔버스의 크기를 구함
          const recalculatedInnerWidth = document.body.offsetWidth / canvasScaleRatio;
          //캔버스의 하얀색 영역의 크기
          const whiteRectWidth = recalculatedInnerWidth * 0.15;

          values.rect1X[0] = (objs.canvas.width - recalculatedInnerWidth) / 2;
					values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
					values.rect2X[0] = values.rect1X[0] + recalculatedInnerWidth - whiteRectWidth;
					values.rect2X[1] = values.rect2X[0] + whiteRectWidth;

          //좌우 박스 그리기
          objs.context.fillRect(
						parseInt(values.rect1X[0]),
						0,
						parseInt(whiteRectWidth),
						objs.canvas.height
					);
					objs.context.fillRect(
						parseInt(values.rect2X[0]),
						0,
						parseInt(whiteRectWidth),
						objs.canvas.height
					);
        }
        break;
      case 3:
        //스크롤 하며 가로 / 세로 모두 꽉 차게 하기 위해 세팅
        const widthRatio = window.innerWidth / objs.canvas.width;
        const heightRatio = window.innerHeight / objs.canvas.height;
        let canvasScaleRatio = 0;
        if( widthRatio <= heightRatio ){
          canvasScaleRatio = heightRatio;
        }else{
          canvasScaleRatio = widthRatio;
        }

        if( !values.reactStartY ){
          values.reactStartY = objs.canvas.offsetTop + (objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2;
          values.rect1X[2].start = ( window.innerHeight / 2 ) / scrollHeight; 
          values.rect2X[2].start = ( window.innerHeight / 2 ) / scrollHeight; 
          values.rect1X[2].end = values.reactStartY / scrollHeight;
          values.rect2X[2].end = values.reactStartY / scrollHeight;
        }
        objs.canvas.style.transform = `scale(${canvasScaleRatio})`;
        objs.context.drawImage(objs.images[0],0,0);
        objs.context.fillStyle = 'white';

        //캔버스 사이즈에 맞춰 가정한 innerWidth와 innerHeight
        //현재 창 사이즈에서 보이는 캔버스의 크기를 구함
        const recalculatedInnerWidth = document.body.offsetWidth / canvasScaleRatio;
        const recalculatedInnerHeight = window.innerHeight / canvasScaleRatio;
        //캔버스의 하얀색 영역의 크기
        const whiteRectWidth = recalculatedInnerWidth * 0.15;

        values.rect1X[0] = (objs.canvas.width - recalculatedInnerWidth) / 2;
        values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
        values.rect2X[0] = values.rect1X[0] + recalculatedInnerWidth - whiteRectWidth;
        values.rect2X[1] = values.rect2X[0] + whiteRectWidth;

        //좌우 박스 그리기
        objs.context.fillRect(parseInt(calcValues(values.rect1X,currnetYoffset)),0, parseInt(whiteRectWidth), objs.canvas.height);
        objs.context.fillRect(parseInt(calcValues(values.rect2X,currnetYoffset)),0, parseInt(whiteRectWidth), objs.canvas.height);

        if ( scrollRatio < values.rect2X[2].end ){
          objs.canvas.classList.remove('sticky');
        }else{
          values.blendHeight[1] = objs.canvas.height;
          //이전 사이즈 조정이 끝나면 바로 시작 할 수 있도록 시작점을 설정
          values.blendHeight[2].start = values.rect2X[2].end;
          values.blendHeight[2].end = values.blendHeight[2].start + 0.2;
          const blendHeight = calcValues(values.blendHeight,currnetYoffset);
          objs.context.drawImage(objs.images[1],
            0, objs.canvas.height - blendHeight, objs.canvas.width, blendHeight,
            0, objs.canvas.height - blendHeight, objs.canvas.width, blendHeight
            )
          objs.canvas.classList.add('sticky');
          objs.canvas.style.top = `${-(objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2}px`;

          if( scrollRatio > values.blendHeight[2].end ){
            values.canvas_scale[0] = canvasScaleRatio;
            values.canvas_scale[1] = document.body.offsetWidth / (1.5 * objs.canvas.width);
            values.canvas_scale[2].start = values.blendHeight[2].end;
            values.canvas_scale[2].end = values.canvas_scale[2].start + 0.2;
            objs.canvas.style.transform = `scale(${calcValues(values.canvas_scale,currnetYoffset)})`;
            objs.canvas.style.marginTop = `0`;
          }

          if( scrollRatio > values.canvas_scale[2].end && values.canvas_scale[2].end > 0){
            objs.canvas.classList.remove('sticky');
            objs.canvas.style.marginTop = `${ scrollHeight * 0.4 }px`;

            values.caption_opacity[2].start = values.canvas_scale[2].end;
            values.caption_opacity[2].end = values.caption_opacity[2].start + 0.1;
            values.caption_translateY[2].start = values.caption_opacity[2].start
            values.caption_translateY[2].end = values.caption_opacity[2].end
            objs.canvasCaption.style.opacity = calcValues(values.caption_opacity,currnetYoffset);
            objs.canvasCaption.style.transform = `translate3d(0,${calcValues(values.caption_translateY,currnetYoffset)}%,0)`

          }
        }

        break;
    }
  }

  function scrollLoop(){
    prevScrollHeight = 0;
      for(let i=0; i < currentScene; i++){
        prevScrollHeight += sceneInfo[i].scrollHeight; 
      }

      if( currnet >= prevScrollHeight + sceneInfo[currentScene].scrollHeight){
        let time = setTimeout(() => {
          currentScene++;
          document.querySelector('body').id = `show-scene-${currentScene}`;
          clearTimeout(time);
        },1)
      }
      if( currnet <= prevScrollHeight ){
        if( currentScene === 0 ) return;
        let time = setTimeout(() => {
          currentScene--;
          document.querySelector('body').id = `show-scene-${currentScene}`;
          clearTimeout(time);
        },1)
      }
      
  }

  function loop(){
    currnet = currnet + ( yoffset - currnet ) * acc;
    if( currentScene === 0  || currentScene === 2){
      const currnetYoffset = currnet - prevScrollHeight;
      const values = sceneInfo[currentScene].values;
      const objs = sceneInfo[currentScene].objs;
      let sequence = parseInt(calcValues(values.imageSequence,currnetYoffset));
      if( objs.videoImage[sequence] ){
        objs.context.drawImage(objs.videoImage[sequence],0,0);
      }
    }

    rafId = requestAnimationFrame(loop);

    if( Math.abs(pageYOffset - currnet) < 1 ){
      cancelAnimationFrame(rafId);
      rafState = false;
    }
  }

  window.addEventListener('resize',() => {
    if( window.innerWidth > 600 ){
      setLayout();
    }
    sceneInfo[3].values.reactStartY = 0;
  });

  window.addEventListener('orientationchange',setLayout);

  window.addEventListener('load',  () => {
    document.body.classList.remove('before-load');
    setLayout();
    sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImage[0],0,0);

      //윈도우의 창 사이즈 변경시 다시 높이를 세팅함
      window.addEventListener('scroll',() => {
        yoffset = window.pageYOffset;
        scrollLoop();
        checkMenu();
        playAnimation();
        if( !rafState ){
          rafId = requestAnimationFrame(loop);
          rafState = true;
        }
      });


    window.addEventListener('resize',() => {
      //가로모드 대응
      if( window.innerWidth > 900 ){
        setLayout();
        sceneInfo[3].values.reactStartY = 0;
      }
    });


    document.querySelector('.loading').addEventListener('transitionend',(e) => {
      document.body.removeChild(e.currentTarget);
    });
  });

  setCanvasImages();
})()