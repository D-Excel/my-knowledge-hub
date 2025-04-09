document.addEventListener("DOMContentLoaded", function () {
    const menuList = document.getElementById("menu-list");
    const topicTitle = document.getElementById("topic-title");
    const topicContent = document.getElementById("topic-content");

    menuItems.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item.title;
        li.addEventListener("click", () => {
            if (item.file === "home") {
                loadHomePage(); // ถ้าคลิก "หน้าแรก" ให้โหลดข้อมูลที่มีอยู่แล้ว
            } else {
                loadTopic(item.file);
            }
        });
        menuList.appendChild(li);
    });

    function loadTopic(file) {
        console.log("กำลังโหลดไฟล์:", file);

        topicTitle.textContent = "กำลังโหลด...";
        topicContent.innerHTML = "<p>กรุณารอสักครู่...</p>";

        delete window.topicData;

        const oldScript = document.getElementById("dynamic-script");
        if (oldScript) {
            document.body.removeChild(oldScript);
        }

        const script = document.createElement("script");
        script.id = "dynamic-script";
        script.src = `data/${file}?nocache=${new Date().getTime()}`;
        
        script.onload = function () {
            if (typeof window.topicData !== "undefined") {
                topicTitle.textContent = window.topicData.title;
                topicContent.innerHTML = window.topicData.content
                    .map(item => `<p class="question">${item.question}</p><p class="answer">${item.answer}</p>`)
                    .join("");
            } else {
                topicTitle.textContent = "เกิดข้อผิดพลาด";
                topicContent.innerHTML = "<p>ไม่สามารถโหลดข้อมูลได้</p>";
            }
        };

        script.onerror = function () {
            topicTitle.textContent = "เกิดข้อผิดพลาด";
            topicContent.innerHTML = `<p>ไม่สามารถโหลดไฟล์ ${file}</p>`;
        };

        document.body.appendChild(script);
    }

    function loadHomePage() {
        console.log("โหลดหน้าแรก");
        topicTitle.textContent = "ข้อมูลการตอบคำถามลูกค้า D-Excel";
        topicContent.innerHTML = `
            <p><span style="font-size: 1.5em; font-weight: bold;">รายละเอียดโปรโมชั่นและเงื่อนไขทั้งหมด "ถูกกว่าสังกะสี มีของแถม" อยู่ในเมนู โปรโมชั่น</span></p
            <ul>
            <p><span style="font-size: 1.5em; font-weight: bold;">ความแตกต่างของคำถามจาก "แชท" หรือ "โทรศัพท์" อยู่ที่ <strong><วิธีการถาม></strong> และ <strong><ลักษณะของลูกค้า></strong></span></p>
            <p><strong>✅ ลูกค้าแชท (Social Media)</strong></p>
            <ul>
                <li><strong>ต้องการความสะดวกและไม่เร่งด่วน</strong> → ลูกค้าสามารถรอคำตอบได้ ไม่ต้องการข้อมูลทั้งหมดในคราวเดียว</li>
                <li><strong>มักจะเลื่อนดูข้อมูลก่อน</strong> → ถามมาเพื่อ <strong>ยืนยัน</strong> ว่าสิ่งที่เห็นในโพสต์หรือเว็บไซต์เป็นข้อมูลล่าสุด</li>
                <li><strong>ถามแบบกระจัดกระจาย</strong> → เช่น วันนี้ถามเรื่องขนาด อีกวันมาถามเรื่องติดตั้ง</li>
                <li><strong>ไม่ชอบตอบคำถามเยอะ</strong> → ถ้าต้องพิมพ์ข้อมูลเยอะ ลูกค้าอาจเงียบหาย</li>
            </ul>
            <p><strong>✅ ลูกค้าโทรศัพท์</strong></p>
            <ul>
                <li><strong>ต้องการคำตอบเร็วและครบถ้วนในครั้งเดียว</strong> → โทรมาเพราะต้องการข้อมูลที่ชัดเจนและพร้อมจะตัดสินใจ</li>
                <li><strong>ต้องการคำแนะนำเฉพาะสำหรับบ้านตัวเอง</strong> → เช่น บ้านของเขาต้องใช้รางน้ำฝนขนาดไหน ต้องติดตั้งยังไง</li>
                <li><strong>มีแนวโน้มจะเป็นลูกค้าจริงมากกว่าแชท</strong> → คนที่โทรเข้ามา มักจะใกล้ตัดสินใจซื้อแล้ว</li>
                <li><strong>ต้องการความมั่นใจจากเสียงคนจริง ๆ</strong> → เพราะข้อความแชทอาจทำให้รู้สึกเหมือนคุยกับบอท</li>
            </ul>
            <h2>เปรียบเทียบลักษณะคำถามระหว่างแชทและโทรศัพท์</h2>
            <table border="1" cellpadding="10" cellspacing="0" style="width: 100%; border-collapse: collapse; text-align: left;">
                <tr style="background-color: #f2f2f2;">
                    <th>ประเด็น</th>
                    <th>แชท (Social Media)</th>
                    <th>โทรศัพท์</th>
                </tr>
                <tr>
                    <td><strong>น้ำเสียงของคำถาม</strong></td>
                    <td>ถามสั้น ๆ ตรงไปตรงมา เช่น "ราคาเท่าไหร่?"</td>
                    <td>มักจะอธิบายบริบท เช่น "ผมกำลังจะติดรางน้ำฝนที่บ้าน อยากรู้ว่าควรใช้ขนาดไหนดี?"</td>
                </tr>
                <tr>
                    <td><strong>ความต้องการคำตอบ</strong></td>
                    <td>รอได้ อาจจะทิ้งข้อความแล้วรอกลับมาดูทีหลัง</td>
                    <td>ต้องการคำตอบเดี๋ยวนั้น และอาจต้องการแนะนำสินค้าเพิ่มเติม</td>
                </tr>
                <tr>
                    <td><strong>รูปแบบการถาม</strong></td>
                    <td>ถามแบบทีละข้อ → "ขนาดอะไรบ้าง?" พอได้คำตอบแล้วค่อยถามต่อ</td>
                    <td>ถามแบบต่อเนื่องในครั้งเดียว → "ขนาดมีอะไรบ้าง? แล้วควรติดยังไง? มีรับประกันไหม?"</td>
                </tr>
                <tr>
                    <td><strong>โอกาสปิดการขาย</strong></td>
                    <td>มีโอกาสสนใจเฉย ๆ อาจยังไม่ซื้อทันที</td>
                    <td>มีแนวโน้มสูงที่จะซื้อหรือขอใบเสนอราคา</td>
                </tr>
                <tr>
                    <td><strong>การตอบสนองที่ดีที่สุด</strong></td>
                    <td>ตอบให้สั้น กระชับ พร้อมลิงก์ข้อมูลเพิ่มเติม</td>
                    <td>ใช้น้ำเสียงที่มั่นใจ ให้คำแนะนำเฉพาะตัว และพยายามปิดการขาย</td>
                </tr>
            </table>
        `;
    }

    loadHomePage(); // โหลดหน้าแรกเมื่อเปิดเว็บ
});
