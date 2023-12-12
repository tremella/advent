export function run() {
    const niceEmojis = ['😊', '🌟', '🎁'];
    const birthdayEmojis = ['🎉', '🎈', '🎁', '🎊'];
    const naughtyEmojis = ['😈', '🍪', '🙊'];


    
    // Create Modal
    if (document.getElementById('naughtyContainer')) {
        return;
    }    
    var container = document.getElementById('naughty');
    var naughtyContainer = document.createElement('div');
    naughtyContainer.id = 'naughtyContainer';

    // Create Header
    var header = document.createElement('h2');
    header.innerText = 'Naughty or Nice?';
    
    // Create Input
    var input = document.createElement('input');
    input.type = 'text';
    input.id = 'nameInput';
    input.placeholder = 'Enter your name';
    
    input.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent default action
            checkNaughtyOrNice();
        }
    });

    // Create Button
    var button = document.createElement('button');
    button.innerText = 'Check';
    button.onclick = checkNaughtyOrNice;
    
    // Create Result Display
    var resultDiv = document.createElement('div');
    resultDiv.id = 'result';
    
    // Append elements to naughtyContainer
    naughtyContainer.appendChild(header);
    naughtyContainer.appendChild(input);
    naughtyContainer.appendChild(button);
    naughtyContainer.appendChild(resultDiv);

    // Append naughtyContainer to container in modal
    container.appendChild(naughtyContainer);

    // Naughty or Nice checker logic
    function hashCode(str) {
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
            var character = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + character;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    }

    function checkNaughtyOrNice() {
        var name = document.getElementById("nameInput").value.toLowerCase();
        var hash = hashCode(name);
        var result = (hash % 2 === 0) ? 'Nice' : 'Naughty';
        if (name === "neena daswani") {
            result = "Happy Birthday!!"
        }
        displayResult(result);
    }

    function createEmojiShower(emojiType) {
        var emojis;
        if (emojiType === "Naughty") {
            emojis = naughtyEmojis;
        }        
        else if (emojiType.includes("Happy Birthday")) {
            emojis = birthdayEmojis;
        }
        else {
            emojis = niceEmojis;
        }        
        const container = document.getElementById('naughty'); // or wherever you want to show the emojis
        const num_emojis = 50;
        for (let i = 0; i < num_emojis; i++) {
            let emoji = document.createElement('div');
            emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.className = 'emoji';
            container.appendChild(emoji);
    
            // Randomize the position and animation delay
            emoji.style.left = Math.random() * 50 + 'vw';
            emoji.style.animationDelay = Math.random() * 2 + 's';

            emoji.addEventListener('animationend', function() {
                emoji.remove();
            });
        }
    }

    function displayResult(result) {
        var resultDiv = document.getElementById("result");
        var resultClass;
        if (result.includes("Happy") || result === "Nice"){
            resultClass = "Nice";
        }
        else {
            resultClass = "Naughty";
        }
        resultDiv.innerHTML = "<span class='" + resultClass + "'>" +  "&lt;" + result + "&gt;" + "</span>";
        createEmojiShower(result);
    }
    input.focus();
}
