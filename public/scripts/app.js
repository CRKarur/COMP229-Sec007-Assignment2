//app.js
//Chandrika Rathna Karur
//Student ID: 301163364
//Oct, 22nd 2020

//IIFE - - Immedietley invoked function expression
(function(){

    function Start()
    {
        console.log("App Started......");

        let deleteButtons = document.querySelectorAll('.btn-danger')

        for(button of deleteButtons)
        {
            button.addEventListener('click', (event)=>{
                if(!confirm("Are you sure?"))
                {
                    event.preventDefault();
                    window.location.assign('/bcontacts-list');
                }
            });
        }

    }

    window.addEventListener("load",Start);

})();