window.onload = function () {
    // VARIABLES
    var inputs = document.getElementById('survey');
    var months = document.querySelector('.months-list');
    var newBtn = document.getElementById('newBtn');
    var addBtn = document.getElementById('addBtn');
    var cancelBtn = document.getElementById('cancelBtn');
    var month = document.getElementById('month');
    var income = document.getElementById('income');
    var lpg = document.getElementById('lpg');
    var ign = document.getElementById('ign');
    var dsl = document.getElementById('dsl');
    var phone = document.getElementById('phone');
    var garbage = document.getElementById('garbage');
    var savings = document.getElementById('savings');
    var daily = document.getElementById('daily');
    var monthsList = [];
    var dailyVal;

    // BUTTONS
    newBtn.addEventListener('click', function () {
        inputs.style.display = "block";
    });
    cancelBtn.addEventListener('click', function () {
        inputs.style.display = "none";
    });
    addBtn.addEventListener('click', addToList);
    months.addEventListener('click', removeEntry);


    // LISTEN TO CHANGES IN NEW SURVEY
    addEventListener('change', function () {
        function calcDaily() {
            dailyVal = income.value - lpg.value - ign.value - dsl.value - phone.value - garbage.value - savings.value;
            daily.value = dailyVal;
            return dailyVal;
        }

        calcDaily();
    });

    // STORAGE SETTINGS
    function JsonStructure(month, income, lpg, ign, dsl, phone, garbage, savings, daily) {
        this.month = month;
        this.income = income;
        this.lpg = lpg;
        this.ign = ign;
        this.dsl = dsl;
        this.phone = phone;
        this.garbage = garbage;
        this.savings = savings;
        this.daily = daily;
    }

    // 	NEW SURVEY
    function addToList() {
        var isNull = month.value !== 'miesiąc' && income.value !== '0' && lpg.value !== '0' && ign.value !== '0' && dsl.value !== '0' && phone.value !== '0' && garbage.value !== '0' && savings.value !== '0' && daily.value !== '';
        if (isNull) {
            var obj = new JsonStructure(month.value, income.value, lpg.value, ign.value, dsl.value, phone.value, garbage.value, savings.value, daily.value);
            monthsList.push(obj);
            localStorage['monthCalc'] = JSON.stringify(monthsList);
            inputs.style.display = "none";
            clearSurvey();
            showMonthList();
            console.log("Dodano zawartość");
        }
    }

    // CLEAR SURVEY FORMS
    function clearSurvey() {
        var fields = document.querySelectorAll('input');
        for (var i in fields) {
            if (fields.hasOwnProperty(i)) {
                fields[i].value = "";
            }
        }
        console.log("Oczyszczono formularz");
    }

    // SHOW STORAGE SURVEY AND EXECTUE
    function showMonthList() {
        if (localStorage['monthCalc'] === undefined) {
            localStorage['monthCalc'] = "[]";
        } else {
            monthsList = JSON.parse(localStorage['monthCalc']);
            months.innerHTML = "";
            for (var n in monthsList) {
                var str = '<tr class="list">';
                str += '<td class="month">' + monthsList[n].month + '</td>';
                str += '<td class="income">' + monthsList[n].income + 'zł</td>';
                str += '<td class="lpg">' + monthsList[n].lpg + 'zł</td>';
                str += '<td class="ign">' + monthsList[n].ign + 'zł</td>';
                str += '<td class="dsl">' + monthsList[n].dsl + 'zł</td>';
                str += '<td class="phone">' + monthsList[n].phone + 'zł</td>';
                str += '<td class="garbage">' + monthsList[n].garbage + 'zł</td>';
                str += '<td class="savings">' + monthsList[n].savings + 'zł</td>';
                str += '<td class="daily">' + monthsList[n].daily + 'zł</td>';
                str += '<td class="del"><button class="delbtn" data-id="' + n + '">USUŃ</button></td>';
                str += '</tr>';
                months.innerHTML += str;
            }
            console.log("Załadowano localStorage");
        }
    }

    showMonthList();

    // DELETE SURVEY
    function removeEntry(evt) {
        if (evt.target.classList.contains('delbtn')) {
            var remID = evt.target.getAttribute('data-id');
            monthsList.splice(remID, 1);
            localStorage['monthCalc'] = JSON.stringify(monthsList);
            showMonthList();
        }
    }
};