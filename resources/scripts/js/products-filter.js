window.onload = function() {
    
    document.getElementById("input-price").onchange = function() {
        document.getElementById("infoRange").innerHTML = "(" + this.value + ")";
    };

    document.getElementById("reset_filter_button").onclick= function(){
        console.log("Reset Filter button clicked");
        document.getElementById("filter-name").value = "";
        document.getElementById("input-price").value = 0;
        document.getElementById("gr_rad").value="all_categories";
        document.getElementById("filter-description").checked = false;
        
        var products = document.getElementsByClassName("product");
        for (let prod of products){
            prod.style.display="block";
        }
        document.getElementById("infoRange").innerHTML = "(0)";
    }
    document.getElementById("filter_button").onclick = function() {
        console.log("Filter button clicked");
        let filter_name = document.getElementById("filter-name").value.toLowerCase();
        let filter_price_min = document.getElementById("input-price").value;
        let filter_category = document.getElementsByName("gr_rad");
        let filter_description;
        if (document.getElementById("filter-description").checked) {
            filter_description = true;
        } else {
            filter_description = false;
        };

        console.log("Filter name: " + filter_name);
        var products = document.getElementsByClassName("product");
        console.log("Products: " + products);

        console.log("Filter category: " + filter_category);
        for (let r of filter_category) {
            console.log("r: " + r);
            if (r.checked) {
                var filter_category_val = r.value;
                console.log("filter_category_val: " + filter_category_val);
                break;
            }
        }

        // console.log("Filter price: " + filter_price);
        // for (let r of filter_price) {
        //     console.log("r: " + r);
        //     if (r.checked) {
        //         var filter_price_val = r.value;
        //         console.log("filter_price_val: " + filter_price_val);
        //         break;
        //     }
        // }
        // if (filter_price_val && (filter_price_val != "all")) {
        //     var interval_min, interval_max;
        //     [interval_min, interval_max] = filter_price_val.split(":");
        //     interval_min = parseInt(interval_min);
        //     interval_max = parseInt(interval_max);
        //     console.log("interval_min: " + interval_min);
        //     console.log("interval_max: " + interval_max);
        // }

        console.log("----");
        console.log("----");
        for (let prod of products) {
            prod.style.display = "none";
            console.log("Product: " + prod);
            var prod_name = prod.getElementsByClassName("product-name")[0].innerHTML.trim().toLowerCase();
            var prod_price = parseInt(prod.getElementsByClassName("product-price")[0].innerHTML.trim());
            var prod_category = prod.getElementsByClassName("product-category")[0].innerHTML.trim();
            var prod_description = prod.getElementsByClassName("product-description")[0].innerHTML.trim();
                        
            let cond1 = prod_name.startsWith(filter_name); // name filter cu caseSensitive
            let cond2 = false; // price slider
            let cond3 = false; // category
            let cond4 = false; // description filter

            console.log("prod_name: " + prod_name);
            console.log("filter_name: " + filter_name);
            console.log("prod_price: " + prod_price);
            console.log("prod_category: " + prod_category);
            console.log("filter_category_val: " + filter_category_val);
            console.log("prod_description: " + prod_description);

            // console.log("price interval: " + interval_min + " - " + interval_max);

            // let cond2 = false;
            // if (filter_price_val == "all" || typeof(filter_price_val) === "undefined") {
            //     cond2 = true;
            // } else {
            //     cond2 = interval_min <= prod_price && prod_price <= interval_max;
            // }

            if (filter_price_min <= prod_price) {
                cond2 = true;
            };

            if (filter_category_val == "all_categories" || typeof(filter_category_val) === "undefined") {
                cond3 = true;
            } else {
                cond3 = filter_category_val == prod_category;
            };

            if (prod_description && filter_description) {
                cond4 = true;
            } else if ( (prod_description === "" || !prod_description) && !filter_description) {
                cond4 = true;
            };

            console.log("cond1: " + cond1);
            console.log("cond2: " + cond2);
            console.log("cond3: ", cond3);
            console.log("########################");
            if (cond1 && cond2 && cond3) {
                prod.style.display = "block";
            }

        };
    };

    document.addEventListener('DOMContentLoaded', () => {
        const descriptions = document.querySelectorAll('.product-description');
    
        descriptions.forEach(description => {
            const readMoreBtn = description.querySelector('.read-more');
            const text = description.querySelector('.description-text');
    
            readMoreBtn.addEventListener('click', () => {
                if (text.style.display === '-webkit-box') {
                    text.style.display = 'block';
                    readMoreBtn.textContent = 'Read less';
                } else {
                    text.style.display = '-webkit-box';
                    readMoreBtn.textContent = '...more';
                }
            });
        });
    });
};