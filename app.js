const $ = (id) => document.getElementById(id);
const notice = $("notice");
document.querySelectorAll(".tab").forEach(btn => btn.addEventListener("click", () => {
  document.querySelectorAll(".tab").forEach(b => b.classList.toggle("active", b === btn));
  document.querySelectorAll(".tab-panel").forEach(p => p.classList.toggle("hidden", p.id !== btn.dataset.tab));
  notice.textContent = "";
}));
function enter(name) {
  $("auth").classList.add("hidden"); $("portal").classList.remove("hidden");
  $("welcome").textContent = `مرحباً ${name}`;
}
$("register").addEventListener("submit", e => {
  e.preventDefault();
  const user = {name:$("studentName").value.trim(), email:$("studentEmail").value.trim(), password:$("studentPassword").value, grade:$("studentGrade").value};
  localStorage.setItem("maysan_demo_user", JSON.stringify(user));
  notice.textContent = "تم إنشاء حساب تجريبي على هذا الجهاز.";
  enter(user.name);
});
$("login").addEventListener("submit", e => {
  e.preventDefault();
  const user = JSON.parse(localStorage.getItem("maysan_demo_user") || "null");
  if (user && user.email === $("loginEmail").value.trim() && user.password === $("loginPassword").value) enter(user.name);
  else notice.textContent = "لم نعثر على حساب تجريبي مطابق. أنشئ حساباً أولاً.";
});
$("teacher").addEventListener("submit", e => { e.preventDefault(); notice.textContent = "تسجيل المدرسين غير مفعّل بعد. يحتاج ربطاً آمناً بقاعدة بيانات ورمزاً من الإدارة."; });
$("logout").addEventListener("click", () => { $("portal").classList.add("hidden"); $("auth").classList.remove("hidden"); });
document.querySelectorAll(".nav-btn").forEach(btn => btn.addEventListener("click", () => {
  document.querySelectorAll(".nav-btn").forEach(b => b.classList.toggle("active", b === btn));
  document.querySelectorAll(".page").forEach(p => p.classList.toggle("hidden", p.id !== `page-${btn.dataset.page}`));
}));
function renderMessages(){const arr=JSON.parse(localStorage.getItem("maysan_demo_messages")||"[]");$("messages").innerHTML=arr.map(m=>`<div class="message"></div>`).join("");[...$("messages").children].forEach((el,i)=>el.textContent=arr[i]);}
$("chatForm").addEventListener("submit",e=>{e.preventDefault();const value=$("chatInput").value.trim();if(!value)return;const arr=JSON.parse(localStorage.getItem("maysan_demo_messages")||"[]");arr.push(value);localStorage.setItem("maysan_demo_messages",JSON.stringify(arr));$("chatInput").value="";renderMessages();});
renderMessages();
