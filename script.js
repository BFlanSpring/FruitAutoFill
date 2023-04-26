const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');
const fruitArr = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];
const liElements = document.getElementsByTagName('li');
let inputStr = "";

function searchHandler(e) {// take key press and turn that key press to a variable to check against list
	const keyPressed = e.key;
	if (input.value === '') { // check if input value is empty
        inputStr = ''; // reset inputStr variable
    } 
	else if(keyPressed !== 'Shift'){ // had to put this is, because if a user upper cases a letter using shift, that shift key press is logged into inputStr
        inputStr += keyPressed; //adds key pressed to inputStr
    }
	if (inputStr === '') { // check to reset inputStr when input value is empty or else whole array will be put in suggestions when all variable are delete
        suggestions.innerHTML = '';
        return;
	}
	const matches = findMatchingFruit(inputStr, fruitArr);
	showSuggestions(matches, suggestions);
}

function findMatchingFruit(inputStr, fruitArr){ 
	var inputLength = inputStr.length;
	var matches = fruitArr.filter(function(fruit){
		return fruit.slice(0,inputLength).toUpperCase()===inputStr.toUpperCase();
	});
	return matches;
}

input.addEventListener('keyup', searchHandler);


function showSuggestions(matches, suggestions) { //add fruits with macthing letter order to list
	suggestions.innerHTML = ""; // Clear the existing suggestions list
    matches.forEach(function(match) { //loops through 
		const li = document.createElement('li');
		li.textContent = match;
		suggestions.appendChild(li);
	});
}

function useSuggestion(e) { //searches for value in textbox in google images
	if(e.target.tagName === 'LI'){
		const clickedSuggestion = e.target.textContent;
		input.value = clickedSuggestion;
		suggestions.innerHTML= '';
	}
}

suggestions.addEventListener('click', useSuggestion);



document.querySelector('body').addEventListener('keypress', function(e){ 
	if (e.key === 'Enter'){
		const searchQuery = input.value;
		const googleImagesUrl = `https://www.google.com/search?q=${searchQuery}&tbm=isch`;
		window.location.href = googleImagesUrl;
	}
})


const darkModeToggle = document.getElementById('dark-mode-checkbox');
darkModeToggle.addEventListener('change', (e) =>{
	if(e.target.checked){
		document.body.classList.add('dark-mode');
		input.classList.add('dark-mode');
		for (let i = 0; i < liElements.length; i++) {
			liElements[i].classList.add('dark-mode');
		  }
		
	} else{
		document.body.classList.remove('dark-mode');
		input.classList.remove('dark-mode');
		for (let i = 0; i < liElements.length; i++) {
			liElements[i].classList.remove('dark-mode');
		  }
	}
})
