var quantCurrentInput = document.getElementById('Q-current');
var quantTargetInput = document.getElementById('Q-target');
var verbalCurrentInput = document.getElementById('V-current');
var verbalTargetInput = document.getElementById('V-target');

var section = document.querySelector('section');
var total = document.querySelector('.total');
var children = document.querySelector('.children');
var btn = document.querySelector('button');
var totalBar = document.querySelector('.total-bar');
var totalTarget = document.querySelector('.total-target');
var totalCurrent = document.querySelector('.total-current');
var quantBar = document.querySelector('.quant-bar');
var quantTarget = document.querySelector('.quant-target');
var quantCurrent = document.querySelector('.quant-current');
var verbalBar = document.querySelector('.verbal-bar');
var verbalTarget = document.querySelector('.verbal-target');
var verbalCurrent = document.querySelector('.verbal-current');
var totalNum = document.querySelector('.total-num');
var quantNum = document.querySelector('.quant-num');
var verbalNum = document.querySelector('.verbal-num')
var totalTargetNum = document.querySelector('.total-target-num');
var totalCurrentNum = document.querySelector('.total-current-num');
var quantTargetNum = document.querySelector('.quant-target-num');
var quantCurrentNum = document.querySelector('.quant-current-num');
var verbalTargetNum = document.querySelector('.verbal-target-num');
var verbalCurrentNum = document.querySelector('.verbal-current-num');
var quantInfo = document.querySelector('.quant-bar-info');
var verbalInfo = document.querySelector('.verbal-bar-info ');
var totalBarInfo = document.querySelector('.total-bar-info');
var totalMsg = document.querySelector('.total-msg');
var quantMsg = document.querySelector('.quant-msg');
var verbalMsg = document.querySelector('.verbal-msg');



var currentQuantScore,currentVerbalScore,targetQuantScore,targetVerbalScore;
var totalMax = 800;
var quantMax = 60;
var verbalMax = 60;


var inputs =Array.from(document.querySelectorAll('input'));

inputs[0].focus();

inputs.forEach(input=>{
    input.addEventListener('input',()=>{
        var regex = /([1-9]|[1-5][0-9]|60)/;
        if(regex.test(input.value)){
            if(input.value <= 60){
                input.nextElementSibling.textContent = 'sucess';
                input.nextElementSibling.style.color = 'green';
                input.nextElementSibling.style.transition = 'all 0.8s linear';
            }else if(input.value > 60){
                input.nextElementSibling.classList.add('show-error');
                input.nextElementSibling.style.color = 'red';
                input.nextElementSibling.textContent = 'Integers between 1 to 60 only';
                
            }
        }else if(!(regex.test(input.value))){
            input.nextElementSibling.classList.add('show-error');
            input.nextElementSibling.style.color = 'red';
            input.nextElementSibling.textContent = 'Integers between 1 to 60 only';
            input.nextElementSibling.style.transition = 'all 0.8s linear';
            
        }

        checking();
    });


});


function init(){
    currentQuantScore = quantCurrentInput.value;
    targetQuantScore = quantTargetInput.value;
    currentVerbalScore = verbalCurrentInput.value;
    targetVerbalScore = verbalTargetInput.value;

    var totalCurrentScore = Math.round(currentQuantScore)+Math.round(currentVerbalScore);
    var totalTargetScore = Math.round(targetQuantScore)+Math.round(targetVerbalScore);
    
    var totalCNum =(200+(totalCurrentScore*5)) ;
    var totalTNum = (200+(totalTargetScore*5));

    var totalCurrentPercentage =(((200+(totalCurrentScore*5))*100)/totalMax) ;
    var totalTargetPercentage = (((200+(totalTargetScore*5))*100)/totalMax) ;
    var quantCurrentPercentage = (currentQuantScore * 100)/ quantMax;
    var quantTargetPercentage = (targetQuantScore * 100)/ quantMax;
    var verbalCurrentPercentage = (currentVerbalScore * 100)/ quantMax;
    var verbalTargetPercentage = (targetVerbalScore * 100)/ quantMax;

    totalTarget.style.width = totalTargetPercentage + '%';
    totalCurrent.style.width = totalCurrentPercentage + '%';
    quantCurrent.style.width = quantCurrentPercentage + '%';
    quantTarget.style.width =  quantTargetPercentage +'%';
    verbalCurrent.style.width = verbalCurrentPercentage  + '%';
    verbalTarget.style.width =  verbalTargetPercentage + '%';

    totalNum.textContent = totalCNum;
    totalTargetNum.textContent = totalTNum;
    totalCurrentNum.textContent = totalCNum;
    quantNum.textContent ='Q'+currentQuantScore;
    verbalNum.textContent = 'V'+currentVerbalScore;
    quantTargetNum.textContent = 'Q'+targetQuantScore;
    quantCurrentNum.textContent = 'Q'+ currentQuantScore;
    verbalTargetNum.textContent = 'V' + targetVerbalScore;
    verbalCurrentNum.textContent = 'V'+ currentVerbalScore;

       // bar-info
    totalBarInfo.textContent = '+'+(totalTNum - totalCNum);
    totalBarInfo.style.width = (totalTargetPercentage - totalCurrentPercentage) + '%';
    totalBarInfo.style.marginLeft = totalCurrentPercentage + '%';

    quantInfo.textContent = '+'+(targetQuantScore - currentQuantScore);
    quantInfo.style.width = (quantTargetPercentage - quantCurrentPercentage) + '%'; 
    quantInfo.style.marginLeft = quantCurrentPercentage + '%';

    verbalInfo.textContent = '+'+(targetVerbalScore - currentVerbalScore);
    verbalInfo.style.width = (verbalTargetPercentage - verbalCurrentPercentage) + '%';
    verbalInfo.style.marginLeft = verbalCurrentPercentage + '%';
    // end-bar-info

    var totalNear = totalTNum - totalCNum;
    var quantNear = targetQuantScore - currentQuantScore;
    var verbalNear = targetVerbalScore - currentVerbalScore;

    var totalToolTip = totalTarget.querySelector('.tool-tip');
    var quantToolTip = quantTarget.querySelector('.tool-tip');
    var verbalToolTip = verbalTarget.querySelector('.tool-tip');
    if(totalCurrentPercentage === totalTargetPercentage){
        equal(totalToolTip,totalBarInfo);
        totalMsg.textContent = `your estimated GMAT score per your performance in this mock test is ${totalCNum},which is equal to your target GMAT score of ${totalTNum}.`;
    }else if(totalCurrentPercentage < totalTargetPercentage){
       removeEqual(totalToolTip,totalBarInfo);
        totalMsg.textContent = `your estimated GMAT score per your performance in this mock test is ${totalCNum},which is ${totalTNum - totalCNum} points lower than your target GMAT score of ${totalTNum}.`;
    }
    else if(totalCurrentPercentage > totalTargetPercentage){
       removeEqual(totalToolTip,totalBarInfo);
       totalBarInfo.style.display = 'none';
        totalMsg.textContent = `your estimated GMAT score per your performance in this mock test is ${totalCNum},which is ${totalCNum - totalTNum} points higher than your target GMAT score of ${totalTNum}.`;
    }
    if((totalNear <= 10 && totalNear > 0) || (totalNear >= -10 && totalNear <= -1)){
        equal(totalToolTip,totalBarInfo);
        totalBarInfo.style.width = 'fit-content';
        totalBarInfo.style.marginLeft = totalTargetPercentage + '%';
        totalBarInfo.style.display = "block";
    }
    if((totalNear >= -7 && totalNear <= -1)){
        totalBarInfo.style.display = "none";
    }
    if(quantCurrentPercentage === quantTargetPercentage){
        equal(quantToolTip,quantInfo);
        quantMsg.textContent = `your estimated quantitative score per your performance in this mock test is Q${currentQuantScore},which is equal to your target GMAT score of Q${targetQuantScore}.`;
    }else if(quantCurrentPercentage < quantTargetPercentage){
       removeEqual(quantToolTip,quantInfo);
        quantMsg.textContent = `your estimated quantitative score per your performance in this mock test is Q${currentQuantScore},which is ${targetQuantScore - currentQuantScore} points lower than your target quantitative score of Q${targetQuantScore}.`
    }else if(quantCurrentPercentage > quantTargetPercentage){
        removeEqual(quantToolTip,quantInfo);
        quantInfo.style.display = 'none';
        quantMsg.textContent = `your estimated quantitative score per your performance in this mock test is Q${currentQuantScore},which is ${currentQuantScore - targetQuantScore} points higher than your target quantitative score of Q${targetQuantScore}.`
    }
    if((quantNear <= 7 && quantNear > 0 )||(quantNear >= -7 && quantNear <= -1)){
        equal(quantToolTip,quantInfo);
        quantInfo.style.width = "fit-content";
        quantInfo.style.marginLeft = quantTargetPercentage + '%';
        quantInfo.style.display = 'block';
    }
    if((quantNear >= -7 && quantNear <= -1)){
        quantInfo.style.display = 'none';
    }
    if(verbalCurrentPercentage === verbalTargetPercentage){
        equal(verbalToolTip,verbalInfo);
        quantMsg.textContent = `your estimated quantitative score per your performance in this mock test is V${currentVerbalScore},which is equal to your target quantitative score of V${targetVerbalScore}.`
    }else if(verbalCurrentPercentage < verbalTargetPercentage){
        removeEqual(verbalToolTip,verbalInfo);
        verbalMsg.textContent = `your estimated quantitative score per your performance in this mock test is V${currentVerbalScore},which is ${targetVerbalScore - currentVerbalScore} points lower than ypur target quantitative score of V${targetVerbalScore}.`
    }else if(verbalCurrentPercentage > verbalTargetPercentage){
        removeEqual(verbalToolTip,verbalInfo);
        verbalInfo.style.display = 'none';
        verbalMsg.textContent = `your estimated quantitative score per your performance in this mock test is V${currentVerbalScore},which is ${currentVerbalScore - targetVerbalScore} points higher than ypur target quantitative score of V${targetVerbalScore}.`
    }
    if((verbalNear <= 7 && verbalNear > 0) || (verbalNear >=-7 && verbalNear <= -1)){
        equal(verbalToolTip,verbalInfo);
        verbalInfo.style.marginLeft = verbalTargetPercentage + '%';
        verbalInfo.style.display = 'block';
    }
    if((verbalNear >=-7 && verbalNear <= -1)){
        verbalInfo.style.display = 'none';
    }
}
function equal(toolTip,info){
    toolTip.style.bottom = '-16px';
    toolTip.firstElementChild.style.display = "none";
    toolTip.style.transform = 'rotate(180deg)';
    info.style.display = 'none';
}
function removeEqual(toolTip,info){
    toolTip.style.bottom = '16px';
    toolTip.firstElementChild.style.display = "block";
    toolTip.style.transform = 'rotate(0deg)translate(50%)';
    info.style.display = 'block';
}
// function targetHigh()

function clickFun(){
        section.style.display = 'block';
        section.style.opacity = 1;
        total.style.animation = `anime 0.3s forwards cubic-bezier(0.61, 0.2, 0.94, 0.9)`;
        children.style.animation = `anime 0.3s 0.3s forwards cubic-bezier(0.61, 0.2, 0.94, 0.9)`;
        init();
        quantCurrentInput.value = "";
        quantTargetInput.value = "";
        verbalCurrentInput.value = "";
        verbalTargetInput.value = "";
}

function checking(){
    if(inputs[0].value === "" || inputs[0].value > 60) {
        return;
    }
    else if(inputs[1].value === "" || inputs[1].value > 60){
        return
    }
    else if(inputs[2].value === "" || inputs[2].value > 60){
        return
    }
    else if(inputs[3].value === "" || inputs[3].value > 60){
        return
    }
    else{
        btn.classList.add('submit');
        btn.addEventListener('click',clickFun,false);
    }
}

// inputs[3].addEventListener('input',()=>{
//     checking();
// })





