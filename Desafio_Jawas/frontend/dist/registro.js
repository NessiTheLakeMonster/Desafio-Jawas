(()=>{"use strict";var e={275:(e,o,t)=>{t.d(o,{OF:()=>a,aI:()=>d,bE:()=>s,yn:()=>i});const r=/^[a-zA-ZÀ-ÿ\s]{2,30}$/,n=/(^[a-zA-Z0-9_]+)@+([a-z]+).([a-z]){2,5}/,l=/^[a-zA-Z0-9!@#$%^&*()_+{}\[\]?\/\\|-]{6,12}$/;function a(e,o){var t=!1;return""==e.value?(o.innerHTML="El campo nombre es obligatorio",o.style.color="red",e.style.borderColor="red"):r.test(e.value)?t=!0:(o.innerHTML="El campo nombre no es válido",o.style.color="red",e.style.borderColor="red"),t}function s(e,o){var t=!1;return""==e.value?(o.innerHTML="El campo apellido es obligatorio",o.style.color="red",e.style.borderColor="red"):r.test(e.value)?t=!0:(o.innerHTML="El campo apellido no es válido",o.style.color="red",e.style.borderColor="red"),t}function d(e,o){var t=!1;return""==e.value?(o.innerHTML="El campo email es obligatorio",o.style.color="red",e.style.borderColor="red"):n.test(e.value)?t=!0:(o.innerHTML="El campo email no es válido",o.style.color="red",e.style.borderColor="red"),t}function i(e,o,t,r){var n=!1;return""==e.value?(t.textContent="El campo contraseña no puede estar vacío",t.style.display="block",t.style.color="red"):l.test(e.value)?e.value!=o.value?(r.textContent="Las contraseñas no coinciden",r.style.display="block",r.style.color="red"):""==o.value?(r.textContent="El campo confirmar contraseña no puede estar vacío",r.style.display="block",r.style.color="red"):n=!0:(t.textContent="La contraseña no es válida",t.style.display="block",t.style.color="red"),n}}},o={};function t(r){var n=o[r];if(void 0!==n)return n.exports;var l=o[r]={exports:{}};return e[r](l,l.exports,t),l.exports}t.d=(e,o)=>{for(var r in o)t.o(o,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:o[r]})},t.o=(e,o)=>Object.prototype.hasOwnProperty.call(e,o),(()=>{var e=t(275);let o=document.getElementById("fotoPerfilRegistro"),r=document.getElementById("nombreRegistro"),n=document.getElementById("apellidoRegistro"),l=document.getElementById("mailRegistro"),a=document.getElementById("passwdRegistro"),s=document.getElementById("confPasswdRegistro"),d=document.getElementById("msgErrorNombre"),i=document.getElementById("msgErrorApellido"),c=document.getElementById("msgErrorEmail"),m=document.getElementById("msgErrorPasswd"),u=document.getElementById("msgErrorConfPasswd"),y=document.getElementById("msgExito");document.getElementById("btnRegistro").addEventListener("click",(function(t){t.preventDefault(),function(){d.textContent="",i.textContent="",c.textContent="",m.textContent="",u.textContent="",y.textContent="";var o=!0;return(0,e.OF)(r,d)||(o=!1),(0,e.bE)(n,i)||(o=!1),(0,e.aI)(l,c)||(o=!1),(0,e.yn)(a,s,m,u)||(o=!1),o}()&&async function(e){var o={method:"POST",headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*"},body:JSON.stringify({fotoPerfil:e.fotoPerfil,nombre:e.nombre,apellido:e.apellido,email:e.email,password:e.passwd,password_confirmation:e.confPasswd})};const t=await fetch("http://127.0.0.1:8000/api/registro",o);return await t.json()}({fotoPerfil:o.value,nombre:r.value,apellido:n.value,email:l.value,passwd:a.value,confPasswd:s.value}).then((e=>{200==e.status?(y.innerHTML="Cuenta creada con éxito",y.style.color="green",window.location.href="login.html"):(y.innerHTML="Error al crear la cuenta",y.style.color="red")})).catch((e=>{console.log(e)}))}))})()})();