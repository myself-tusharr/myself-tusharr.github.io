window.onload = () => {
    
    /* defining vars and req dom elements */
    const inputs = document.querySelectorAll(".form input"); //in order : name, number, mm, yy, cvc, submit
    
    const form = document.querySelector(".form");
    const formContainer = document.querySelector(".form-container");
    const successBox = document.querySelector(".success-box");
    const numberOnCard = document.querySelector(".card-front .number");
    const nameOnCard = document.querySelector(".card-front .display-name");
    const expiryOnCard = document.querySelector(".card-front .expiry-date");
    const cvcOnCard = document.querySelector(".card-back .cvc");
    
    /* checking if all inputs valid */
    function isValid(name,number,month,year,cvc){
        if(name.length < 1){
            inputs[0].focus();
            return false;
        }else if(number.length < 19){
            inputs[1].focus();
            return false;
        }else if(month < 1 | month > 12){
            inputs[2].focus();
            return false;
        }else if(year < 24){
            inputs[3].focus();
            return false;
        }else if(cvc < 100){
            inputs[4].focus();
            return false;
        }else{
            return true;
        }
    }
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let values = [];
        for(let i=0;i <=4;i++){
            values.push(inputs[i].value);
        }
        const [name, number, month, year, cvc] = values;
        if(isValid(name, number, month, year, cvc)){
            formContainer.style.display = "none";
            successBox.style.display = "block";
            numberOnCard.innerHTML = number;
            nameOnCard.innerHTML = name;
            expiryOnCard.innerHTML = month+"/"+year;
            cvcOnCard.innerHTML = cvc;
        }
    });
    
    inputs[0].addEventListener('input', () => {
        const value = inputs[0].value;
        const lastLetter = value[inputs[0].value.length - 1];
        allowed = "abcdefgh ijklmnopqrstuvwxyz"
        let isAllowed = allowed.match(lastLetter.toLowerCase())
        if(!isAllowed){
            inputs[0].value = value.slice(0,value.length-1);
        }
    });
    
    inputs[1].addEventListener('input', (e) => {
        const value = inputs[1].value;
        
        //value can only be number
        const lastLetter = value[inputs[1].value.length - 1];
        allowed = "0123456789"
        let isAllowed = allowed.match(lastLetter)
        if(!isAllowed){
            inputs[1].value = value.slice(0,value.length-1);
        }else{
            //formatting number (spacing between 4 digits)
            if(value.length == 4 | value.length == 9 | value.length == 14){
                inputs[1].value = value + " ";
            }else if(value.length == 19){
                const nextValue = inputs[2].value
                if(nextValue <= 9){
                    inputs[2].focus();
                }else{
                    inputs[1].blur();
                }
            }else if(value.length > 19){
                inputs[1].value = value.slice(0,value.length-1);
            }
        }
    });
    
    inputs[2].addEventListener('input', () => {
        const value = inputs[2].value;
        if (value > 99){
            inputs[2].value=parseInt(inputs[2].value/10);
            return;
        }
        const nextValue = inputs[3].value
        if (value > 9){
            if(nextValue <= 9){
                inputs[3].focus();
            }else{
                inputs[2].blur();
            }
        }
    });
    
    inputs[3].addEventListener('input', () => {
        const value = inputs[3].value;
        if (value > 99){
            inputs[3].value=parseInt(inputs[3].value/10);
            return;
        }
        const nextValue = inputs[4].value
        if (value > 9){
            if(nextValue <= 99){
                inputs[4].focus();
            }else{
                inputs[3].blur();
            }
        }
    });
    
    inputs[4].addEventListener('input', () => {
        let value = inputs[4].value;
        if (value > 999){
            inputs[4].value=parseInt(inputs[4].value/10);
            return;
        }
        if (value > 99){
            inputs[4].blur();
        }
    });
    
}