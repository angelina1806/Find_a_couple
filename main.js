document.addEventListener('DOMContentLoaded', function () {
    let vertical_quantity = document.querySelector('.vertical_quantity');
    let horizont_guantity = document.querySelector('.horizontal_quantity');
    let form = document.querySelector('.my-form');
    let submit = document.querySelector('.my-submit');   
    let game_field = document.querySelector('.game_field');
    let start_over_btn = document.querySelector('.restart_btn');
    let card_active = document.querySelectorAll('.card--active')    
    const span = document.createElement('span')
    form.addEventListener('submit', function() {
        let v = vertical_quantity.value;
        let h = horizont_guantity.value;

        let myArr = shuffle(random_value((v * h) / 2))

        if ((v * h) % 2 == 1) {
            span.innerText = 'Количество карточек должно быть четным';
            submit.after(span);
        } else card_rendering(v, h, myArr);
        
        search_card();

        const timer_game = setInterval (function(){location.reload()}, 60000);
    })

    function random_value (n) {
        let arr = [];
        let newArr = [];
        
        for (let i = 0; i < n; i++) {
            arr[i] = i + 1;
        }

        newArr = arr;
        
        return newArr.concat(arr);
    }

    function shuffle (arr) {
        let i = 12;

        while (--i > 0) {
            let v = Math.ceil(Math.random() * arr.length ) - 1;
            let w = Math.ceil(Math.random() * arr.length ) - 1;

            let item = arr[v];
            arr[v] = arr[w];
            arr[w] = item;
        }
        return arr;
    }

    function card_rendering (v, h, arr) {

        let width = (v * 100) + 100;

        form.classList.add('my-form-closed');
        start_over_btn.classList.add('hidden');
        game_field.classList.remove('hidden');
        game_field.style.width = JSON.stringify(width) + 'px';


        for (let i = 0; i < h; i++) {

            let row = document.createElement('div');
            row.classList.add('row');
            game_field.append(row);

            for(let j = 0; j < v; j++){
                let card = document.createElement('div');

                card.classList.add('card');
                card.className = 'card';
                row.append(card);
                card.innerText = arr[i * v + j];
            }         
        }

        return game_field;  

    }

    function search_card () {
        
        let card = document.querySelectorAll('.card');

        let card_value_arr = [];
        let counter = 0;
        let selected_card_arr = [];

        card.forEach(item => {
            counter++;

            item.addEventListener('click', function () {

                item.classList.add('card--active');
                card_value_arr.push(item.innerText);
                item.classList.add('class');

              
                if (card_value_arr.length == 2 && card_value_arr[0] == card_value_arr[1]) {
                    document.querySelectorAll('.class').forEach(el => {
                        el.classList.add('card--open');
                    });
                    selected_card_arr.push(2);
                    
                    card_value_arr.splice(0, 2);

                    if (selected_card_arr.length * 2 == counter) {
                        start_over_btn.classList.add('restart_btn--active');
                        start_over_btn.classList.remove('hidden');
                    }

                } else if (card_value_arr.length == 2 && card_value_arr[0] != card_value_arr[1]) {

                    let timer = setTimeout(function(){document.querySelectorAll('.card').forEach(item => item.classList.remove('card--active'))}, 300)
                    
                    document.querySelectorAll('.card').forEach(item => item.classList.remove('class'));
                    card_value_arr.splice(0, 2);
                }
                
            });

        })

        start_over_btn.addEventListener('click', function () {

            game_field.classList.add('hidden');
            card.forEach(item => {
                item.remove();
            })

            form.classList.remove('my-form-closed');
        })

       
    }

})