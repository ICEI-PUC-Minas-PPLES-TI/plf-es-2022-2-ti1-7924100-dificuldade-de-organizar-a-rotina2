function myfunc(event) {
    event.preventDefault();


    var categoria = document.getElementById("name").value
    var cor = document.getElementById("format").value


    localStorage.setItem('is_categoria', categoria);
    localStorage.setItem('is_cor', cor);
    

}

document.getElementById("send").addEventListener('click', function(event){

  event.preventDefault()

  
  var categoria = document.getElementById("name").value
  var cor = document.getElementById("format").value


  localStorage.setItem('is_categoria', categoria);
  localStorage.setItem('is_cor', cor);

  console.log('hello')
  
})