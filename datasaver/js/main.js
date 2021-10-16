function copy(enc1, enc2, enc3, enc4) {
  //let enc = enc1 + enc2 + enc3 + enc4;
  console.log(enc1);
  console.log(enc2);
  console.log(enc3);
  console.log(enc4);
  let enc = enc1 + enc2 + enc3 + enc4;
  let dec = GibberishAES.dec(enc, "1234");
  copier(dec);
  //console.log(dec);
}
/*
// GibberishAES.enc(string, password)
// Defaults to 256 bit encryption
enc = GibberishAES.enc(
  "This sentence is super secret",
  "ultra-strong-password"
);
alert(enc);
GibberishAES.dec(enc, "ultra-strong-password");

// Now change size to 128 bits
GibberishAES.size(128);
enc = GibberishAES.enc("This sentence is not so secret", "1234");
GibberishAES.dec(enc, "1234");

// And finally 192 bits
GibberishAES.size(192);
enc = GibberishAES.enc("I can't decide!!!", "whatever");
GibberishAES.dec(enc, "whatever");
*/
window.addEventListener("load", initialize);

function copier(msg) {
  navigator.clipboard.writeText(msg);

  /* Alert the copied text */
  alert("Password Copied");
}

function initialize() {
  document.getElementById("formSubmit").addEventListener("submit", onsubmitdo);

  function onsubmitdo(e) {
    e.preventDefault();
    var site = document.getElementById("site").value;
    var accountID = document.getElementById("accountID").value;
    var password = document.getElementById("password").value;
    var enc = GibberishAES.enc(password, "1234");
    console.log(enc);
    // console.log(enc.slice(0, enc.length / 2));
    // console.log(enc.slice(enc.length / 2, enc.length));

    let enc1 = enc.slice(0, enc.length / 4);
    let enc2 = enc.slice((1 * enc.length) / 4, (2 * enc.length) / 4);
    let enc3 = enc.slice((2 * enc.length) / 4, (3 * enc.length) / 4);
    let enc4 = enc.slice((3 * enc.length) / 4, (4 * enc.length) / 4);

    // console.log(enc1);
    // console.log(enc2);
    // console.log(enc3);
    // console.log(enc4);

    //  console.log("before copy");

    var allvaluesinarray = [];
    // create object
    keeper = {
      keepsite: site,
      keepaccountID: accountID,
      keeppassword1: enc1,
      keeppassword2: enc2,
      keeppassword3: enc3,
      keeppassword4: enc4,
    };
    if (localStorage.getItem("hold") === null) {
      // object pushed to array
      allvaluesinarray.push(keeper);
      // send the array to localStorage as object

      localStorage.setItem("hold", JSON.stringify(allvaluesinarray));
    } else {
      // if its not null, the fetch all localstorage values and then insert again
      allstoredvaluesinArrayForm = JSON.parse(localStorage.getItem("hold"));
      allstoredvaluesinArrayForm.push(keeper);
      localStorage.setItem("hold", JSON.stringify(allstoredvaluesinArrayForm));
    }

    document.getElementById("site").value = "";
    document.getElementById("accountID").value = "";
    document.getElementById("password").value = "";
    FetchAllValuesDisplayTable();
  }
}

const table = document.getElementById("table");
table.addEventListener("click", (e) => {
  var cells = table.getElementsByTagName("td");

  for (var i = 0; i < cells.length; i++) {
    // Take each cell
    var cell = cells[i];
    // do something on onclick event for cell
    cell.onclick = function () {
      // Get the row id where the cell exists
      var rowId = this.parentNode.rowIndex;
      var rowSelected = table.getElementsByTagName("tr")[rowId];
      console.log(rowSelected);

      let i = parseInt(rowSelected.cells[0].innerHTML);
      copy(
        arrayFormated[i].keeppassword1,
        arrayFormated[i].keeppassword2,
        arrayFormated[i].keeppassword3,
        arrayFormated[i].keeppassword4
      );
    };
  }
});

function FetchAllValuesDisplayTable() {
  arrayFormated = [];
  output = "";
  arrayFormated = JSON.parse(localStorage.getItem("hold"));
  for (var i = 0; i < arrayFormated.length; i++) {
    output +=
      `
            <tr class='bg-default inline;'>
            <td>` +
      i +
      `</td> 
            <td>` +
      arrayFormated[i].keepsite +
      `</td> <i class="far fa-copy" id='copy'></i>
            <td>` +
      arrayFormated[i].keepaccountID;
    +`</td>
            </tr>
        `;
  } /*
  var table = document.getElementById("table");
  var cells = table.getElementsByTagName("td");

  for (var i = 0; i < cells.length; i++) {
    // Take each cell
    var cell = cells[i];
    // do something on onclick event for cell
    cell.onclick = function () {
      // Get the row id where the cell exists
      var rowId = this.parentNode.rowIndex;
      var rowSelected = table.getElementsByTagName("tr")[rowId];
      console.log(rowSelected);

      msg = "The ID of the company is: " + rowSelected.cells[0].innerHTML;
      msg += "\nThe cell value is: " + this.innerHTML;
      alert(msg);
    };
  }
*/
  document.getElementById("dynamicFill").innerHTML = output;
}

/*
onclick="copy('${
        (arrayFormated[i].keeppassword1,
        arrayFormated[i].keeppassword2,
        arrayFormated[i].keeppassword3,
        arrayFormated[i].keeppassword4)
      }')
*/
