const $=id=>document.getElementById(id);
const inputs={
 name:$("name"),empId:$("empId"),blood:$("blood"),designation:$("designation"),
 department:$("department"),mobile:$("mobile"),joining:$("joining"),valid:$("valid")
};

function update(){
 $("pName").textContent=inputs.name.value.toUpperCase()||"EMPLOYEE NAME";
 $("pId").textContent=inputs.empId.value.toUpperCase()||"VSI-001";
 $("pDesignation").textContent=inputs.designation.value.toUpperCase()||"DESIGNATION";
 $("pDepartment").textContent=inputs.department.value.toUpperCase()||"DEPARTMENT";
 $("pMobile").textContent=inputs.mobile.value||"MOBILE";
 $("bId").textContent=inputs.empId.value.toUpperCase()||"VSI-001";
 $("bBlood").textContent=inputs.blood.value.toUpperCase()||"O+";
 $("bJoining").textContent=inputs.joining.value||"DATE";
 $("bValid").textContent=inputs.valid.value||"VALID";
 $("bMobile").textContent=inputs.mobile.value||"MOBILE";
 $("barcodeText").textContent=inputs.empId.value.toUpperCase()||"VSI-001";
 makeBarcode();
}
Object.values(inputs).forEach(x=>x.addEventListener("input",update));

function imageTo(el,file,placeholder){
 if(!file)return;
 const r=new FileReader();
 r.onload=e=>{
   el.src=e.target.result;el.style.display="block";
   if(placeholder)placeholder.style.display="none";
 };
 r.readAsDataURL(file);
}
$("photo").addEventListener("change",e=>imageTo($("photoFront"),e.target.files[0],$("photoText")));
$("logo").addEventListener("change",e=>{
 const f=e.target.files[0];if(!f)return;
 imageTo($("logoFront"),f);imageTo($("logoBack"),f);
});

function makeBarcode(){
 const box=$("barcode");box.innerHTML="";
 const text=(inputs.empId.value||"VSI001").toUpperCase();
 for(let i=0;i<58;i++){
   const c=text.charCodeAt(i%text.length);
   const bar=document.createElement("i");
   const w=((c+i*7)%4)+1;
   bar.style.width=w+"px";
   bar.style.opacity=((c+i)%5===0)?".55":"1";
   box.appendChild(bar);
 }
}

function clone(id,target){
 const t=$(target);t.innerHTML="";
 const c=$(id).cloneNode(true);c.removeAttribute("id");
 t.appendChild(c);
}
$("printBtn").addEventListener("click",()=>{
 clone("frontCard","printFront");clone("backCard","printBack");window.print();
});
$("resetBtn").addEventListener("click",()=>{
 inputs.name.value="SHIVAM KUMAR";inputs.empId.value="VSI-001";inputs.blood.value="O+";
 inputs.designation.value="SOFTWARE ENGINEER";inputs.department.value="IT & SOFTWARE";
 inputs.mobile.value="+91 98765 43210";inputs.joining.value="01-08-2026";inputs.valid.value="31-07-2027";
 $("photoFront").src="";$("photoFront").style.display="none";$("photoText").style.display="grid";
 update();
});
update();
