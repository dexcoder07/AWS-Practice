const checkBox = document.querySelectorAll('.custom-check-box');
const inputBox = document.querySelectorAll('input');
const errorLabel = document.querySelector('.error-label');
const progressValue = document.querySelector('.progress-value');
const taskCompleted = document.querySelector('.taskNumber');
const input1 = document.querySelector('#input1');
const input2 = document.querySelector('#input2');
const input3 = document.querySelector('#input3');
const subHeading = document.querySelector('.subHeading');

const quotes = [
    'Raise the bar by completing the goals',
    'Well Begun if half done!',
    'Just a step away, keep going!',
    'Whoa! You just completed all the goals, time for chill!!'
]


const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {}
let count = Object.values(allGoals).filter((counter) => {
    return counter.completed;
}).length
progressValue.style.width = `${count * 33}%`;
taskCompleted.innerHTML = `${count}/3 Completed`;
subHeading.innerHTML = quotes[count];

checkBox.forEach((checkbox) => {
    checkbox.addEventListener('click', (e) =>{
        const allFieldsFilled = [...inputBox].every(function (input){
            if(input.value != ''){
                return true;
            }
            else{
                return false;
            }
        });
        if(allFieldsFilled){
            if(checkbox.parentElement.classList.contains('completed') == false){
                count++;
                progressValue.style.width = `${count * 33}%`;
                taskCompleted.innerHTML = `${count}/3 Completed`;
            }
            else{

                //class is having completed so make allgoals completed as true
                count--;
                progressValue.style.width = `${count * 33}%`;
                taskCompleted.innerHTML = `${count}/3 Completed`;
            }    
            subHeading.innerHTML = quotes[count];
            checkbox.parentElement.classList.toggle('completed');
            allGoals[checkbox.nextElementSibling.id].completed = !allGoals[checkbox.nextElementSibling.id].completed;
            // progressValue.style.width = `${count * 33}%`;
            localStorage.setItem('allGoals', JSON.stringify(allGoals));
        } 
        else{
            errorLabel.style.display = 'block';
        }
    })
})

inputBox.forEach(function (input) {

    if(Object.keys(allGoals).length != 0){
        input.value = allGoals[input.id].name;
        if(allGoals[input.id].completed == true){
            input.parentElement.classList.add('completed');
        }
    }

    input.addEventListener('focus', () => {
        errorLabel.style.display = 'none';
    })

    input.addEventListener('input', (evt) => {
        if(allGoals[input.id].completed){
            input.value = allGoals[input.id].name
            return;
        }
        allGoals[evt.target.id] = {
            name: evt.target.value,
            completed: false,
        }
        //Saving data into local storage
        localStorage.setItem('allGoals', JSON.stringify(allGoals));
    })
})