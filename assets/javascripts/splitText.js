function splitText(parent_div_class, wrapper_class_name, class_name) {
	let parent_array = document.getElementsByClassName(parent_div_class);
	for(var j=0; j<parent_array.length; j++) {
		let text = parent_array[j].innerText;
		parent_array[j].innerText = "";

		let word = text.split(" ");

		for(var i=0; i<word.length; i++) {
			let word_div = document.createElement('div');
			word_div.className = wrapper_class_name + " " + wrapper_class_name + "-" + (i+1);

			word[i].split("").forEach(function(c) {
				let char_div = document.createElement('div');
				char_div.className = class_name;
				char_div.append(c);
				word_div.append(char_div);
			});

			parent_array[j].append(word_div);
			
			let space = document.createElement('div');
			space.className = 'space-char';
			space.append(" ");
			parent_array[j].append(space);
		};
	};
};