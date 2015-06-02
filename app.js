function roundAnimation() {

	var winW = window.innerWidth || document.documentElement.clientWidth,
		winH = window.innerHeight || document.documentElement.clientHeight,

		$ul = document.getElementById('js-list'),
		$li = $ul.children,

		$ulTarget = document.getElementById('js-target'),
		$liTarget = $ulTarget.children,

		$dependence = document.querySelectorAll('.js-dependence'),

		minRoundW = 20,
		maxRoundW,
		imgMg = {},
		topTarget = {},
		leftTarget = {},

		liActiveFlag = false,

		animDuration = 400;

	for (var i = 0; i < $li.length; i++) {

		if ( RegExp('(^| )' + 'active' + '( |$)', 'gi').test($li[i].classList) ) {
			liActiveFlag = true;
			break;
		}
	}

	position();

	for (var i = 0; i < $li.length; i++) {

		$liTarget[i].addEventListener('click', function(event) {

			var $childrenArr = Array.prototype.slice.call($liTarget),
				index = $childrenArr.indexOf(this),
				$img = $li[index].querySelectorAll('.img'),
				$parent = $li[index];

			for (var k = 0; k < $dependence.length; k++) {
				$dependence[k].querySelector('.active').classList.remove('active');
				$dependence[k].children[index].classList.add('active');
			};

			if (liActiveFlag) { // to unactive
				var $activeChld = $parent.parentElement.children;
					$active = $parent.parentElement.querySelector('.active'),
					$imgActive = $active.querySelectorAll('.img'),
					$activeChldArr = Array.prototype.slice.call($activeChld),
					indexActive = $activeChldArr.indexOf($active),

					$thisTarget = $liTarget[indexActive],

					coordinatesTarget = $thisTarget.getBoundingClientRect();

				$active.classList.remove('active');

				$active.style.width = minRoundW + 'px';
				$active.style.height = minRoundW + 'px';
				$active.style.top = topTarget[indexActive] + 'px';
				$active.style.left = leftTarget[indexActive] + 'px';

				$active.style.transitionProperty = 'width, height, top, left';
				$active.style.transitionDuration = animDuration/1000 + 's';
				$active.style.transitionTimingFunction = 'step-end';

				for (var z = 0; z < $img.length; z++) {
					$imgActive[z].style.margin = imgMg[indexActive + '-' + z];

					$imgActive[z].style.transition = 'margin ' + animDuration/1000 + 's' + ' step-end';
				}
			}

			$parent.classList.add('active');

			$parent.style.width = maxRoundW + 'px';
			$parent.style.height = maxRoundW + 'px';
			$parent.style.top = -(maxRoundW/2 - topTarget[index]) + 'px';
			$parent.style.left = -(maxRoundW/2 - leftTarget[index]) + 'px';

			$parent.style.transitionProperty = 'width, height, top, left';
			$parent.style.transitionDuration = animDuration/1000 + 's';
			$parent.style.transitionTimingFunction = 'linear';

			for (var z = 0; z < $img.length; z++) {
				$img[z].style.margin = (maxRoundW/2 - topTarget[index]) + 'px 0 0 ' + (maxRoundW/2 - leftTarget[index]) + 'px';

				$img[z].style.transition = 'margin ' + animDuration/1000 + 's' + ' linear';
			}

			liActiveFlag = true;

		}, false);
	};

	window.addEventListener('resize', function(event) {

        winW = window.innerWidth || document.documentElement.clientWidth;
		winH = window.innerHeight || document.documentElement.clientHeight;

		position();

    });

    function position() {

	    for (var i = 0; i < $li.length; i++) {

	    	var $this = $li[i],
	    		$img = $this.querySelectorAll('.img'),
				$thisTarget = $liTarget[i],

				thisTargetW = $thisTarget.clientWidth,
				thisTargetH = $thisTarget.clientHeight,

				coordinatesTarget = $thisTarget.getBoundingClientRect();

			topTarget[i] = Math.round(coordinatesTarget.top + (thisTargetH - minRoundW)/2 + pageYOffset);
			leftTarget[i] = Math.round(coordinatesTarget.left + (thisTargetW - minRoundW)/2 + pageXOffset);

			if (i == 0) {
				var pdBottomTarget = winH - (coordinatesTarget.bottom - thisTargetH/2 + pageYOffset),
					pdRightTarget = winW - (coordinatesTarget.right - thisTargetW/2 + pageYOffset),
					pdTopTarget = topTarget[i] + minRoundW/2,
					corX = pdRightTarget,
					corY;

				if ( pdBottomTarget > pdTopTarget ) {
					corY = pdBottomTarget;
				} 
				else {
					corY = pdTopTarget;
				}

				maxRoundW = Math.sqrt( Math.pow(corX,2) + Math.pow(corY,2) ) * 2;
				
			}

			$this.style.margin = 0;
			$this.style.position = 'absolute';

			for (var z = 0; z < $img.length; z++) {

				$img[z].style.width = winW + 'px';
				$img[z].style.height = winH + 'px';
			}

			if ( !( RegExp('(^| )' + 'active' + '( |$)', 'gi').test($this.classList) ) ) {
				$this.style.width = minRoundW + 'px';
				$this.style.height = minRoundW + 'px';
				$this.style.top = topTarget[i] + 'px';
				$this.style.left = leftTarget[i] + 'px';

				var coordinates = $this.getBoundingClientRect(),
					top = Math.round(coordinates.top + pageYOffset),
					left = Math.round(coordinates.left + pageXOffset);

				for (var z = 0; z < $img.length; z++) {

					$img[z].style.margin = -top + 'px 0 0 ' + -left + 'px';

					imgMg[i + '-' + z] = $img[z].style.margin;
				}
			} else {

				$this.style.width = maxRoundW + 'px';
				$this.style.height = maxRoundW + 'px';
				$this.style.top = -(maxRoundW/2 - topTarget[i]) + 'px';
				$this.style.left = -(maxRoundW/2 - leftTarget[i]) + 'px';

				for (var z = 0; z < $img.length; z++) {
					imgMg[i + '-' + z] = -(topTarget[i] + pageYOffset) + 'px 0 0 ' + -(leftTarget[i] + pageXOffset) + 'px';

					$img[z].style.margin = (maxRoundW/2 - topTarget[i]) + 'px 0 0 ' + (maxRoundW/2 - leftTarget[i]) + 'px';

				}
			}
	    }
	}
}

roundAnimation();