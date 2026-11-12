const form = document.getElementById("gradeForm");
const resultBox = document.getElementById("result");
const resetBtn = document.getElementById("resetBtn");
const MAX_MARKS = 100;

form.addEventListener("submit", function (event) {
  event.preventDefault();                       // stop page reload

  const name = document.getElementById("name").value.trim() || "Student";
  const ids = ["m1", "m2", "m3", "m4", "m5"];
  let total = 0;

  for (const id of ids) {
    const value = parseFloat(document.getElementById(id).value);   // string -> number
    if (isNaN(value) || value < 0 || value > MAX_MARKS) {
      showError("Please enter valid marks between 0 and 100 for all subjects.");
      return;
    }
    total += value;
  }

  const maxTotal = ids.length * MAX_MARKS;
  const percentage = (total / maxTotal) * 100;

  let grade;
  if (percentage >= 90) grade = "O (Outstanding)";
  else if (percentage >= 80) grade = "A+ (Excellent)";
  else if (percentage >= 70) grade = "A (Very Good)";
  else if (percentage >= 60) grade = "B (Good)";
  else if (percentage >= 50) grade = "C (Average)";
  else if (percentage >= 40) grade = "D (Pass)";
  else grade = "F (Fail)";

  const passed = percentage >= 40;
  resultBox.className = "result" + (passed ? "" : " fail");
  resultBox.innerHTML =
    "<b>Student:</b> " + escapeHtml(name) + "<br>" +
    "<b>Total:</b> " + total + " / " + maxTotal + "<br>" +
    "<b>Percentage:</b> " + percentage.toFixed(2) + " %<br>" +
    "<b>Grade:</b> <span class='grade'>" + grade + "</span><br>" +
    "<b>Result:</b> " + (passed ? "PASS" : "FAIL");
});

resetBtn.addEventListener("click", function () {
  form.reset();
  resultBox.className = "result hidden";
  resultBox.textContent = "";
});

function showError(message) {
  resultBox.className = "result error";
  resultBox.textContent = message;
}

// student name is user text, so it is escaped before using innerHTML
function escapeHtml(text) {
  return text.replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}
