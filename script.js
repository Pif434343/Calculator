
let input = '';
let memory = 0;
let res = 0;
let story = [];
let longStory = '';
let $input = document.querySelector('.input');
let $story = document.querySelector('.story');

$input.onkeyup = function(e){
	console.log(e)
	if(e.key == 'Enter')
		ev('=');
}

$input.oninput = function(e){
	ev(e.inputType == "deleteContentBackward" ? '<' : e.data);
	return false;
};

[...document.querySelectorAll('button')].forEach(function(el) {
	el.onclick = ev;
})

function ev(data) {
	let value = typeof data == 'string' ? data : this.attributes['inTo'].value;

		if(value == 'MRC'){

		if(input != $input.value)
			input = $input.value;
		let result = memory;
		input = $input.value = result;
		memory = 0;
		return false;
		}		
		
		if(value == 'M+'){
				
		memory = memory + res;
		return false;
			}
			
		if(value == 'M-'){
			
		memory = memory - res;

		return false;
			}				
		
	if(value == 'C'){

		if(!input && $input.value)
			input = $input.value;

		if(input)
			return $input.value = longStory = input = '';

		$story.innerHTML = '';
		return false;
	}
	

	if(value == '='){
		if(input != $input.value)
			input = $input.value;

		let string = longStory ? `(${longStory.split('=')[0]})${input.replace(longStory.split('=')[1], '')}` : input;
		let result = strToMath(string);
		
		longStory = `${string}=${result}`;
		story.push(`${input}=${result}`);
		$story.innerHTML += `<i>${story[story.length-1]}</i>`;
		input = $input.value = result;
		res = result;
		return false;
	}

	if(story.length && value == '.' || !input && value == '.'){
		value = '0.';
	}

	story = [];

	input += value;
	$input.value = input;
}

function strToMath(string){
	string = string.replaceAll(' ', '').replaceAll('+', ' + ').replaceAll('*', ' * ').replaceAll('-', ' - ').replaceAll('/', ' / ').split(' ');
	
	for(let i = 0; i < string.length; i++){
		if(string[i] == ''){
			string.splice(i, 3);
			string[i] = '-'+string[i];
		}
	}
	
	let calc = document.createElement('calc');
	calc.style['opacity'] = `calc(${string.join(' ')})`;
	let result = parseFloat(calc.style['opacity'].replace('calc(', '').replace(')', ''))
	calc.remove();

	return result;
}