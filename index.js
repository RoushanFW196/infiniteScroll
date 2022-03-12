// const getquotes = () => {
//   fetch(`https://api.javascripttutorial.net/v1/quotes/?page=${page}&limit=25`)
//     .then((d) => d.json())
//     .then((res) =>{ console.log(res);
      
//         showquotes(res.data)
    
//     })
//     .catch((err) => console.log(err));
// };

// getquotes();

// function showquotes(arr) {
//   arr.map((el) => {
//     let div = document.createElement("div");
//     let span = document.createElement("span");
//     span.innerHTML = el.id;
//     let h3 = document.createElement("h3");
//     h3.innerHTML = el.quote ;
//     let h5 = document.createElement("h5");
//     h5.innerHTML = el.author;
//     div.setAttribute("class","quote")
//     div.append(span,h3, h5);
//     document.getElementById("quotes-container").append(div);
//   });
// }


// let currentpage=1;
// let limit=25;
// let total=0;

// // const hasMoreQuotes = (page, limit, total) => {
// //     const startIndex = (page - 1) * limit + 1;
// //     return total === 0 || startIndex < total;
// // };
















// window.addEventListener('scroll', () => {
//     const {
//         scrollTop,
//         scrollHeight,
//         clientHeight
//     } = document.documentElement;

//     if (scrollTop + clientHeight >= scrollHeight - 5 &&
//         hasMoreQuotes(currentpage, limit, total)) {
//         currentpage++;
//         loadQuotes(currentpage, limit);
//     }
// }, {
//     passive: true
// });


(function () {

    const quotesEl = document.querySelector('.quotes');
    const loaderEl = document.querySelector('.loader');

    // get the quotes from API
    const getQuotes = async (page, limit) => {
        const API_URL = `https://api.javascripttutorial.net/v1/quotes/?page=${page}&limit=25`;
        const response = await fetch(API_URL);
        // handle 404
        if (!response.ok) {
            throw new Error(`An error occurred: ${response.status}`);
        }
        return await response.json();
    }

    // show the quotes
    const showQuotes = (quotes) => {
        quotes.forEach(quote => {
            const quoteEl = document.createElement('blockquote');
            quoteEl.classList.add('quote');

            quoteEl.innerHTML = `
            <span>${quote.id})</span>
            ${quote.quote}
            <footer>${quote.author}</footer>
        `;

            quotesEl.appendChild(quoteEl);
        });
    };

    const hideLoader = () => {
        loaderEl.classList.remove('show');
    };

    const showLoader = () => {
        loaderEl.classList.add('show');
    };

    const hasMoreQuotes = (page, limit, total) => {
        const startIndex = (page - 1) * limit + 1;
        return total === 0 || startIndex < total;
    };

    // load quotes
    const loadQuotes = async (page, limit) => {

        // show the loader
        showLoader();

        // 0.5 second later
        setTimeout(async () => {
            try {
                // if having more quotes to fetch
                if (hasMoreQuotes(page, limit, total)) {
                    // call the API to get quotes
                    const response = await getQuotes(page, limit);
                    // show quotes
                    showQuotes(response.data);
                    // update the total
                    total = response.total;
                }
            } catch (error) {
                console.log(error.message);
            } finally {
                hideLoader();
            }
        }, 500);

    };

    // control variables
    let currentPage = 1;
    const limit=25;
    
    let total = 0;


    window.addEventListener('scroll', () => {
        const {
            scrollTop,
            scrollHeight,
            clientHeight
        } = document.documentElement;

        if (scrollTop + clientHeight >= scrollHeight - 5 &&
            hasMoreQuotes(currentPage, limit, total)) {
            currentPage++;
            loadQuotes(currentPage, limit);
        }
    }, {
        passive: true
    });

    // initialize
    loadQuotes(currentPage, limit);

})();



