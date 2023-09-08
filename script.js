document.addEventListener("DOMContentLoaded", function () {
    const map = document.getElementById("map");
    const modal = document.getElementById("modal");
    const closeModal = document.querySelector(".close");
    const table = modal.querySelector("table");

    function getProvinceData(provinceId) {
        return JSON.parse(localStorage.getItem(provinceId)) || {};
    }

    function saveProvinceData(provinceId, data) {
        localStorage.setItem(provinceId, JSON.stringify(data));
    }

    function openModal(data, provinceId) {
        const header = modal.querySelector("h2");
        header.textContent = provinceId;
        table.innerHTML = `
          <tr>
            <th>Clima:</th>
            <td contenteditable>${(data.clima || "").replace(/\n/g, "<br>")}</td>
          </tr>
          <tr>
            <th>Provincias:</th>
            <td contenteditable>${(data.provincias || "").replace(/\n/g, "<br>")}</td>
          </tr>
          <tr>
            <th>Relieve:</th>
            <td contenteditable>${(data.relieve || "").replace(/\n/g, "<br>")}</td>
          </tr>
          <tr>
            <th>Fauna:</th>
            <td contenteditable>${(data.fauna || "").replace(/\n/g, "<br>")}</td>
          </tr>
          <tr>
            <th>Flora:</th>
            <td contenteditable>${(data.flora || "").replace(/\n/g, "<br>")}</td>
          </tr>
        `;

        modal.style.display = "block";

        const saveButton = document.createElement("button");
        saveButton.textContent = "Guardar";
        saveButton.addEventListener("click", function () {
            const clima = table.querySelector("tr:nth-child(1) td").innerHTML.replace(/<br>/g, '\n');
            const provincias = table.querySelector("tr:nth-child(2) td").innerHTML.replace(/<br>/g, '\n');
            const relieve = table.querySelector("tr:nth-child(3) td").innerHTML.replace(/<br>/g, '\n');
            const fauna = table.querySelector("tr:nth-child(4) td").innerHTML.replace(/<br>/g, '\n');
            const flora = table.querySelector("tr:nth-child(5) td").innerHTML.replace(/<br>/g, '\n');

            const newData = { clima, provincias, relieve, fauna, flora };
            saveProvinceData(provinceId, newData);
            closeModalFunc();
        });
        saveButton.classList = 'saveButton'

        table.appendChild(saveButton);
    }

    function closeModalFunc() {
        modal.style.display = "none";
        table.innerHTML = ""; 
    }

    map.addEventListener("click", function (event) {
        const clickedProvinceId = event.target.id;
        const allowedProvinceIds = ["PATAGONIA", "NOROESTE", "CUYO", "PAMPEANA", "LITORAL"];

        if (allowedProvinceIds.includes(clickedProvinceId)) {
            const provinceData = getProvinceData(clickedProvinceId);
            openModal(provinceData, clickedProvinceId);
        }
    });

    closeModal.addEventListener("click", closeModalFunc);
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeModalFunc();
        }
    });
});
