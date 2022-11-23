const newTable = async () => {
  let modalNew = new bootstrap.Modal(document.getElementById("modalTable"), {
    keyboard: false,
    backdrop: true,
  });
  document.querySelector(".modal-title").innerHTML = "Nueva Mesa";
  document.querySelector(".modal-body").innerHTML = `${createModal()}`;
  modalNew.show();
  const btnSave = document.getElementById("btnSave");

  btnSave.addEventListener("click", async (e) => {
    e.preventDefault();
    const form = new FormData(formTable);
    let data = {};
    form.forEach((value, key) => (data[key] = value));

    try {
      const response = await fetch("/api/table", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        Swal.fire({
          title: "Mesa creada",
          icon: "success",
          showConfirmButton: false,
          timer: 800,
        }).then(() => {
          modalNew.hide();
          window.location.reload() 
          // $("#tableMesas").dataTable().fnDestroy();
          // listTable()
        });
      } else {
        const res = await response.json();
        Swal.fire({
          title: "Error",
          text: "Campos Incorrectos",
          icon: "error",
          showConfirmButton: false,
          timer: 1000,
        });
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.log(error);
    }
  });
  modalNew.addEventListener("hidden.bs.modal", (e) => {
    closeModal();
  });
};

document.getElementById("btnAdd").addEventListener("click", async () => {
  await newTable();
});
