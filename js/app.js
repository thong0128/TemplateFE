function addNewTab1() {
  //lấy dữ liệu từ form html
  let name = $('#tab1Name').val();
  let model = $('#model').val();
  let price = $('#price').val();
  let newTab = {
    name: name,
    model: model,
    price: price
  };
  // gọi phương thức ajax
  $.ajax({
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    type: "POST",
    data: JSON.stringify(newTab),
    //tên API
    url: "http://localhost:8080/api/tab1s/create",
    //xử lý khi thành công
    success: successHandler

  });
  //chặn sự kiện mặc định của thẻ
  event.preventDefault();
}

function successHandler() {
  $.ajax({
    type: "GET",
    //tên API
    url: "http://localhost:8080/api/tab1s",
    //xử lý khi thành công
    success: function (data) {
      // hiển thị danh sách ở đây
      let content = '    <table id="display-list"  border="1"><tr>\n' +
        '        <th>Name</td>\n' +
        '        <th>Tab2</td>\n' +
        // '        <th>Price</td>\n' +
        // '        <th>Delete</td>\n' +
        '    </tr>';
      for (let i = 0; i < data.length; i++) {
        content += getTab1(data[i]);
      }
      content += "</table>"
      document.getElementById('tab1List').innerHTML = content;
      document.getElementById('tab1List').style.display = "block";
      document.getElementById('add-tab1').style.display = "none";
      document.getElementById('display-create').style.display = "block";
      document.getElementById('title').style.display = "block";
    }
  });
}

function displayFormCreate() {
  document.getElementById('tab1List').style.display = "none";
  document.getElementById('add-tab1').style.display = "block";
  document.getElementById('display-create').style.display = "none";
  document.getElementById('title').style.display = "none";
}

function getTab1(tab1) {
  return `<tr><td >${tab1.name}</td><td >${tab1.tab2.name}</td>` +
    `<td class="btn"><button class="deleteTab1" onclick="deleteTab1(${tab1.id})">Delete</button></td></tr>`;
}

function deleteTab1(id) {
  $.ajax({
    type: "DELETE",
    //tên API
    url: `http://localhost:8080/api/smartphones/delete/${id}`,
    //xử lý khi thành công
    success: successHandler
  });
}

function getTab2Option(tab2) {
  console.log(tab2);
  return '<option value=${tab2.id} > ${tab2.name} </option>';
}

function showTab2List() {
  $.ajax({
    type: "GET",
    //tên API
    url: "http://localhost:8080/api/tab2s",
    //xử lý khi thành công
    success: function (data) {
      let content = '<select name="tab2" id="tab2">';
      for (let i = 0; i < data.length; i++) {
        // content += getTab2Option(data[i]);
        content += '<option value = "${data[i].id}"  > ${data[i].name}  </option>'
        // contr += '<option value ="' data[i].id; ' > '+ data[i].name + '</option>'
      }
      content += '</select>';
      document.getElementById("tab2").innerHTML = content;
    }
  });
}
