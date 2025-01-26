"use client"
import React, { useState, useRef } from 'react';

const DeliveryForm = () => {
 const [selectedId, setSelectedId] = useState("");
 const [formData, setFormData] = useState({
   handoverDate: "",
   approvalDate: "",
   address: ""
 });
 const canvasRef = useRef(null);
 const [isDrawing, setIsDrawing] = useState(false);

 const apartments = [
   { id: "16", floor: "0", building: "7", contract: "2023-06-14", buyer1: { name: "אחיה יחיאל", id: "326352655" }, size: "123.95" },
   { id: "12", floor: "-1", building: "7", contract: "2023-07-16", buyer1: { name: "ניצן שמר", id: "213564040" }, size: "123.95" },
   { id: "13", floor: "0", building: "7", contract: "2023-08-08", buyer1: { name: "מיכאל בירן", id: "322631300" }, size: "106.55" },
   { id: "19", floor: "1", building: "7", contract: "2023-10-19", buyer1: { name: "עידן שי", id: "37968922" }, buyer2: { name: "איילת שי", id: "305300154" }, size: "109.93" },
   { id: "20", floor: "1", building: "7", contract: "2023-12-31", buyer1: { name: "שמשון סולימן", id: "52268489" }, size: "109.73" },
   { id: "18", floor: "1", building: "7", contract: "2024-05-09", buyer1: { name: "שלום ערקי", id: "52808060" }, size: "123.51" },
   { id: "14", floor: "0", building: "7", contract: "2024-09-24", buyer1: { name: "שמואליאן יסכה", id: "213292873" }, buyer2: { name: "כץ יהודה", id: "206995219" }, size: "124.72" },
   { id: "17", floor: "1", building: "7", contract: "2024-09-24", buyer1: { name: "גוטמן ענבל", id: "207828922" }, buyer2: { name: "גוטמן עמית יהונתן", id: "211768122" }, size: "123.25" },
   { id: "11", floor: "-1", building: "7", contract: "2024-10-10", buyer1: { name: "טל שחר מתניה", id: "39119029" }, size: "124.15" },
   { id: "1", floor: "-4", building: "7", contract: "2024-12-09", buyer1: { name: "י.ש אזמרה יזמות בע\"מ", id: "515770824" }, size: "158.12" },
   { id: "2", floor: "-4", building: "7", contract: "2024-12-09", buyer1: { name: "י.ש אזמרה יזמות בע\"מ", id: "515770824" }, size: "135.17" },
   { id: "3", floor: "-4", building: "7", contract: "2024-12-09", buyer1: { name: "י.ש אזמרה יזמות בע\"מ", id: "515770824" }, size: "134.98" },
   { id: "4", floor: "-4", building: "7", contract: "2024-12-09", buyer1: { name: "י.ש אזמרה יזמות בע\"מ", id: "515770824" }, size: "157.89" },
   { id: "22", floor: "2", building: "7", contract: "2024-12-16", buyer1: { name: "כהן יהודה", id: "34467803" }, size: "109.35" }
 ];

 const selectedApartment = apartments.find(apt => apt.id === selectedId);

 const handleStartDrawing = (e) => {
   setIsDrawing(true);
   const canvas = canvasRef.current;
   if (!canvas) return;
   const ctx = canvas.getContext('2d');
   ctx.beginPath();
   const rect = canvas.getBoundingClientRect();
   const x = e.type.includes('touch') ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
   const y = e.type.includes('touch') ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
   ctx.moveTo(x, y);
 };

 const handleDrawing = (e) => {
   if (!isDrawing) return;
   const canvas = canvasRef.current;
   if (!canvas) return;
   const ctx = canvas.getContext('2d');
   const rect = canvas.getBoundingClientRect();
   const x = e.type.includes('touch') ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
   const y = e.type.includes('touch') ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
   ctx.lineTo(x, y);
   ctx.stroke();
 };

 const handleStopDrawing = () => {
   setIsDrawing(false);
 };

 const clearSignature = () => {
   const canvas = canvasRef.current;
   if (!canvas) return;
   const ctx = canvas.getContext('2d');
   ctx.clearRect(0, 0, canvas.width, canvas.height);
 };

 const exportToPDF = () => {
   window.print();
 };

 return (
   <main className="container mx-auto p-4">
     <div className="bg-blue-900 text-white p-8 mb-8 rounded-lg text-center">
       <h1 className="text-4xl font-bold">שריקי</h1>
       <div className="text-xl">יזמות ובניה בע"מ</div>
     </div>

     <div className="bg-white rounded-lg shadow p-6 mb-6">
       <h2 className="text-2xl font-bold mb-4">בחירת דירה</h2>
       <select 
         value={selectedId}
         onChange={(e) => setSelectedId(e.target.value)}
         className="w-full p-2 border rounded mb-4"
       >
         <option value="">בחר דירה</option>
         {apartments.map(apt => (
           <option key={apt.id} value={apt.id}>
             {`דירה ${apt.id} - קומה ${apt.floor} - ${apt.buyer1.name}${apt.buyer2 ? ' ו' + apt.buyer2.name : ''}`}
           </option>
         ))}
       </select>

       {selectedId && (
         <div className="grid grid-cols-2 gap-4">
           <div>
             <label className="block mb-2">תאריך מסירה:</label>
             <input
               type="date"
               value={formData.handoverDate}
               onChange={(e) => setFormData({...formData, handoverDate: e.target.value})}
               className="w-full p-2 border rounded"
             />
           </div>
           <div>
             <label className="block mb-2">תאריך אישור אכלוס:</label>
             <input
               type="date"
               value={formData.approvalDate}
               onChange={(e) => setFormData({...formData, approvalDate: e.target.value})}
               className="w-full p-2 border rounded"
             />
           </div>
           <div className="col-span-2">
             <label className="block mb-2">כתובת:</label>
             <input
               type="text"
               value={formData.address}
               onChange={(e) => setFormData({...formData, address: e.target.value})}
               className="w-full p-2 border rounded"
             />
           </div>
         </div>
       )}
     </div>

     {selectedApartment && (
       <div className="bg-white rounded-lg shadow p-6">
         <div className="space-y-6">
           <div className="text-center font-bold text-xl">פרוטוקול מסירה</div>
           
           <div className="space-y-2">
             <p>תאריך: {formData.handoverDate}</p>
             <p>לכבוד</p>
             <p>שריקי גרופ יזמות ובניה בע"מ</p>
             <p>רחוב בעלי המלאכה 203</p>
             <p>נתיבות</p>
           </div>

           <div>
             <h3 className="font-bold text-lg mb-2">הנדון: אכלוס דירה בפרויקט "שריקי הילס צופים"</h3>
             <p className="mb-4">
               בהתאם להוראות חוזה המכר שנחתם בנינו לבין החברה ביום {selectedApartment.contract} 
               אשר במסגרתו רכשנו את הזכויות בדירה מס' {selectedApartment.id} 
               קומה מס' {selectedApartment.floor} בניין {selectedApartment.building}
               (על פי התיאור בחוזה המכר)
             </p>

             <p className="mb-4">
               פרויקט <strong>שריקי הילס צופים</strong> ברחוב: {formData.address}
               (בהתאם לתיאור הדירה בעירייה) (להלן: "<strong>הדירה</strong>")
             </p>

             <p>
               אנו, הח"מ {selectedApartment.buyer1.name} ת.ז. {selectedApartment.buyer1.id}
               {selectedApartment.buyer2 ? ` ו${selectedApartment.buyer2.name} ת.ז. ${selectedApartment.buyer2.id}` : ''}
             </p>
           </div>

           <p>
             מאשרים בזאת כי ביום {formData.handoverDate} נמסרה לנו החזקה בדירה, 
             לאחר שביום {formData.approvalDate} ניתן אישור לאכלוס הדירה.
             המסירה כוללת את מפתחות הכניסה לדירה, מפתחות החדרים, מפתח דלת הכניסה לבניין, מפתח לתיבת הדואר.
           </p>

           <ol className="list-decimal pr-8 space-y-2">
             <li>הננו מאשרים קבלת תעודות אחריות למערכות השונות בדירה.</li>
             <li>הננו מאשרים כי בדקנו את הדירה במעמד חתימתנו על מסמך זה, וכי בבדיקתנו מצאנו כי הליקויים שפורטו בפרוטוקול המסירה המקדים תוקנו לשביעות רצוננו המלאה.</li>
             <li>הננו מאשרים כי בדקנו את הפרטים הבאים ומצאנו אותם שלמים ותקינים:</li>
           </ol>

           <ul className="list-disc pr-12 space-y-2">
             <li>כל אביזרי האינסטלציה לרבות: אסלות, כיורים, אמבטיות, אגניות ברזים, מושבי אסלה וכל יתר הפריטים הסניטריים בדירה.</li>
             <li>אריחי הריצוף והחיפוי.</li>
             <li>דלתות עץ ומתכת לרבות הידיות והמנעולים.</li>
             <li>אביזרי החשמל לרבות: מפסקים, בתי תקע, לוח חשמל ובתי מנורות.</li>
             <li>חלונות האלומיניום, ודלתות האלומיניום, לרבות השמשות המותקנות בהן, וחלקי הפרזול.</li>
             <li>תריסים.</li>
             <li>ארונות מטבח ומשטח העבודה במטבח.</li>
             <li>קולטי שמש, ודוד חשמל.</li>
           </ul>

           <ol className="list-decimal pr-8 space-y-2" start="4">
             <li>הננו מאשרים כי הדירה נמסרה לנו בהתאם להוראות ההסכם והמפרט הטכני שצורף לו.</li>
             <li>הננו מאשרים כי קיבלנו את חוברת הוראות התחזוקה והשימוש בדירה.</li>
             <li>אנו מצהירים בזאת, כי אנו מוותרים על כל טענה או דרישה או תביעה כנגד החברה.</li>
             <li>אנו הח"מ מאשרים קבלת הפניה למועצה מקומית צופים ומתחייבים בזאת לשאת בהוצאות הארנונה החל ממועד מסירת החזקה בדירה.</li>
           </ol>

           <div className="mt-8 pt-4 border-t">
             <p className="mb-4">בכבוד רב,</p>
             
             <div>
               <canvas
                 ref={canvasRef}
                 width={400}
                 height={200}
                 className="border rounded bg-white"
                 onMouseDown={handleStartDrawing}
                 onMouseMove={handleDrawing}
                 onMouseUp={handleStopDrawing}
                 onMouseLeave={handleStopDrawing}
                 onTouchStart={handleStartDrawing}
                 onTouchMove={handleDrawing}
                 onTouchEnd={handleStopDrawing}
               />
               
               <div className="flex gap-4 mt-4">
                 <button 
                   onClick={clearSignature}
                   className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                 >
                   נקה חתימה
                 </button>
                 <button 
                   onClick={exportToPDF}
                   className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                 >
                   ייצא לPDF
                 </button>
               </div>
             </div>
           </div>
         </div>
       </div>
     )}
   </main>
 );
};

export default DeliveryForm;
<style jsx global>{`
  @media print {
    @page { margin: 2cm; }
    .print\\:hidden { display: none !important; }
    body { background: white; }
  }
  
  .container {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .form-section {
    margin-bottom: 2rem;
    padding: 2rem;
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
`}</style>
git init
git add .
git commit -m "Initial commit"