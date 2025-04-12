import React from 'react';

function ProfileCard() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center p-6 bg-white text-gray-800 rounded-lg shadow-lg max-w-md mx-auto font-kanit">
      <img 
        src="https://i.imgur.com/maMC7a7.jpeg" 
        alt="จักรพงษ์" 
        className="w-32 h-32 rounded-full sm:mr-6 mb-4 sm:mb-0 mx-auto sm:mx-0 transform transition duration-300 hover:scale-110"
      />
      <div className="text-center sm:text-left">
        <h2 className="text-2xl font-bold">สวัสดีครับ, ฉันชื่อ จักรพงษ์</h2>
        <p className="mt-2 text-lg">นี่คือลักษณะของข้อมูลที่ฉันอยากจะแชร์กับคุณ เกี่ยวกับตัวฉันเอง</p>
        <ul className="mt-4 list-disc pl-5 space-y-1 text-left">
          <li>💼 อาชีพ: Project Manager</li>
          <li>💡 ความสนใจ: เทคโนโลยี, รถไฟฟ้า, การเขียนนิยาย</li>
          <li>📖 เกี่ยวกับ: มุ่งมั่นทำงานเป็นทีม วางแผน และพัฒนาตนเองอยู่เสมอ</li>
        </ul>
      </div>
    </div>
  );
}

export default ProfileCard;
