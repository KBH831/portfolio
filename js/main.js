// text
(function(){
    const spanEl = document.querySelector('main h2 span')
    const txtArr = ['제 이름은 김보형입니다. ','My name is Bo-hyeong Kim. ', '私の名前は金保亨と申します。']
    // console.log(txtArr)
    let index = 0;
    let currentTxt = txtArr[index].split("")
    // console.log(currentTxt)

    // writeTxt
    function writeTxt(){
        spanEl.textContent += currentTxt.shift()
        // 배열 요소를 앞에서부터 하나씩 출력
        // shift : 배열 맨 앞요소를 추출하고 추출한 요소를 원본에서 삭제

        // 만약에 currentTxt길이가 0 이 아니라면
        if(currentTxt.length !== 0){
            setTimeout(writeTxt, Math.floor(Math.random() * 100))
            // math.random 0~ 100까지 숫자가 무작위(속도)로 작성되도록
        }else {
            // 0 이면 일정 시간 후에 deleteTxt
            currentTxt = spanEl.textContent.split("")
            // write 함수 끝내기전에 화면에 나온 텍스트를 지우기 위해 다시 가져와서 배열에다가 단어 단위로 분리해둠
            setTimeout(deleteTxt, 3000) // 3초 후에 텍스트 지우기
        }
    }
    // deleteTxt
    function deleteTxt(){
        currentTxt.pop() // 배열 요소를 끝에서부터 하나씩 삭제j
        spanEl.textContent = currentTxt.join()
        // join : 현재 배열에 있는 요소를 하나의 문자열로 합침 ==> 삭제된것처럼 보임
        if(currentTxt.length !==0){
            setTimeout(deleteTxt, Math.floor(Math.random() * 100))
            //deleteTxt 함수를 0~100 무작위로 설정
        }else {
            // 모든 배열이 사라지면 else 시작!! 
            index = (index + 1) % txtArr.length
            // 다음 문장 출력을 하기 위해 배열에 다시 접근하여 index 숫자를 증가시킴
            currentTxt = txtArr[index].split("")
            writeTxt()
        }
    }
    writeTxt()
})()

// header scroll

const headerEl = document.querySelector('header')

window.addEventListener('scroll', function(){
    requestAnimationFrame(scrollCheck)
})
function scrollCheck(){
    let browerScrollY = window.scrollY ? window.scrollY : window.pageYOffset
    if(browerScrollY > 0) {
        headerEl.classList.add('active')
    }else {
        headerEl.classList.remove('active')
    }
}


// 애니메이션 스크롤 이동 (메뉴 클릭하면 해당영역으로 이동하기)

// ----이동하려는 대상의 현재 위치값을 구하는 코드
const animationMove = function(selector){
    // 1. selector 매개변수로 이동할 대상 가져오기
    const targetEl = document.querySelector(selector)

    // 2. 현재 브라우저 스크롤Y값
    const browerScrollY = window.pageYOffset

    // 3. 이동할 대상의 위치(Y값)
    const targetScrollY = targetEl.getBoundingClientRect().top + browerScrollY
    // --- getBoundingClientRect : 상대적인 위치정보 제공(요소의 크기와 뷰포트에 따라)

    // 4. 스크롤 이동
    window.scrollTo({
        top: targetScrollY,
        behavior : 'smooth'
    })
}

// scroll event 연결
// button 태그에 data - * 속성으로 

const scrollMove = document.querySelectorAll('[data-animation-scroll= "true"]')
for(let i = 0; i < scrollMove.length; i++){
    scrollMove[i].addEventListener('click', function(){
        const target = this.dataset.target
        animationMove(target)
    })
}