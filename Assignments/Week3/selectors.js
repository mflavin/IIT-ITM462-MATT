window.onload = ColorPage;

function ColorPage() {
  var child = document.getElementsByClassName('relevant')[0];
  child.getElementsByTagName('p')[0].style.backgroundColor = 'red'
  child.getElementsByTagName('p')[0].style.backgroundColor = 'red';
  child.getElementsByTagName('p')[1].style.backgroundColor = 'blue';
  child.getElementsByTagName('p')[2].style.backgroundColor = 'yellow';
  child.getElementsByTagName('p')[3].style.backgroundColor = 'orange';
  child.getElementsByTagName('p')[4].style.backgroundColor = 'green';
  child.getElementsByTagName('p')[5].style.backgroundColor = 'purple';
  child.getElementsByTagName('p')[6].style.backgroundColor = 'cyan';
}