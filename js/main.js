$(function () {

  $('.initial').click(function () {
    $(this).addClass('heart big-red')
    $(this).text('')

    setTimeout(() => {

      $('.big-red').addClass('pulseAnimated');
      $('.front > .valentine-wrapper > .little-1').addClass('fade-in-out-animated');
      $('#sound').css('visibility', 'visible');

      //Flips card on click on icon
      $(".turn-icon").click(function() {
        $('.flip-container').toggleClass("flipped");
        setTimeout(() => {
          $('.back > .valentine-wrapper > .little-1').addClass('fade-in-out-animated');
        }, 1000)
      });

      //Sets continous revealing of text
      setTimeout(() => {
        $('#text1').toggleClass('revealed');
      }, 100)
      setTimeout(() => {
        $('#text2').toggleClass('revealed');
      }, 3200)
      setTimeout(() => {
        $('#text3').toggleClass('revealed');
      }, 6300)

      //Sets turn icon to show after text animation finishes
      setTimeout(() => {
        $('.turn-icon').css('visibility', 'visible')
      }, 9000)

      let audio1 = new Audio('../audio1.mp3')
      let audio2 = new Audio('../audio2.mp3')
      let currentAudio = 1;

      audio1.play()
      $(audio1).on('ended', () => {
        audio2.currentTime = 0;
        audio2.play();
        currentAudio = 2;
      });
      $(audio2).on('ended', () => {
        audio1.currentTime = 0;
        audio1.play();
        currentAudio = 1;
      });

      $('#sound').click(function () {
        let audio1Playing = !audio1.paused && audio1.duration > 0;
        let audio2Playing = !audio2.paused && audio2.duration > 0;

        if(audio1Playing || audio2Playing) {
          $(this).attr('src', 'img/sound-off.png')
        }
        else {
          $(this).attr('src', 'img/sound-on.png')
        }

        if(audio1Playing) {
          audio1.pause()
        }
        else if(audio2Playing) {
          audio2.pause()
        }
        else if((!audio1Playing && !audio2Playing) && currentAudio === 1) {
          audio1.play();
        }
        else {
          audio2.play()
        }

      })
    }, 2500)
  })

  let t1 = gsap.timeline({ paused: true });
  let flap = CSSRulePlugin.getRule(".envelope:before");

  t1.to(flap, {
    duration: 0.5,
    cssRule: {
      rotateX: 180
    }
  })
    .set(flap, {
      cssRule: {
        zIndex: 10
      }
    })
    .to('.letter', {
      translateY: -200,
      duration: 0.9,
      ease: "back.inOut(1.5)"
    })
    .set('.letter', {
      zIndex: 40
    })
    .to('.letter', {
      duration: .7,
      ease: "back.out(.4)",
      translateY: -5,
      translateZ: 250
    });

  let t2 = gsap.timeline({ paused: true });
  t2.to('.shadow', {
    delay: 1.4,
    width: 450,
    boxShadow: "-75px 150px 10px 5px #eeeef3",
    ease: "back.out(.2)",
    duration: .7
  });

  function openCard(e) {
    t1.play();
    t2.play();
  }

  function closeCard(e) {
    t1.reverse();
    t2.reverse();
  }

  $('.envelope').click(openCard)
  $('.close').click(closeCard)



  $('.reveal').click(function() {



    //----------------------------------------RISING PARTICLES----------------------------------------------------------



    //TODO Srdíčková animace - zatím příliš složitá
    /*let particleTop1AppendInterval = setInterval(() => {
      let particle = $.parseHTML('<div class="heart particle up"></div>')
      $('.particle-row1').append(particle);
      setTimeout(() => {
        $(particle).toggleClass('rise');
      }, 100)
      setTimeout(() => {
        $(particle).animate({
          opacity: 0
        }, 200)
      }, 800)
    }, 365)

    let particleTop2AppendInterval = setInterval(() => {
      let particle = $.parseHTML('<div class="heart particle up"></div>')
      $('.particle-row2').append(particle);
      setTimeout(() => {
        $(particle).toggleClass('rise');
      }, 100)
      setTimeout(() => {
        $(particle).animate({
          opacity: 0
        }, 200)
      }, 800)
    }, 365)


    //-------------------------------------------FALLING PARTICLES------------------------------------------------------
    let particleBottom1AppendInterval = setInterval(() => {
      let particle = $.parseHTML('<div class="heart particle down"></div>')
      $('.particle-row3').append(particle);
      setTimeout(() => {
        $(particle).toggleClass('fall');
      }, 100)
      setTimeout(() => {
        $(particle).animate({
          opacity: 0
        }, 200)
      }, 800)
    }, 365)

    let particleBottom2AppendInterval = setInterval(() => {
      let particle = $.parseHTML('<div class="heart particle down"></div>')
      $('.particle-row4').append(particle);
      setTimeout(() => {
        $(particle).toggleClass('fall');
      }, 100)
      setTimeout(() => {
        $(particle).animate({
          opacity: 0
        }, 200)
      }, 800)
    }, 365)

    //-------------------------------------------CLEARING OFFSETS-------------------------------------------------------

    // clear timeout for non-offseted particles (timeout = text animation length)
    setTimeout(() => {
      clearInterval(particleTop1AppendInterval)
      clearInterval(particleTop2AppendInterval)
      clearInterval(particleBottom1AppendInterval)
      clearInterval(particleBottom2AppendInterval)
    }, 3000) //todo: tady podle konkretni hodnoty
*/
    // clear timeout for offseted particles (timeout = text animation length - offset * time for one particle)
  });
})
