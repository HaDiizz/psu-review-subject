const checkbox = document.getElementById("checkbox");
const bodyClass = document.body.classList;

const isDarkMode = localStorage.getItem("darkMode") === "true";
if (isDarkMode) {
  bodyClass.add("dark");
  checkbox.checked = true;
}

checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    bodyClass.add("dark");
    localStorage.setItem("darkMode", "true");
  } else {
    bodyClass.remove("dark");
    localStorage.setItem("darkMode", "false");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const searchSubjectButton = document.getElementById("btn-search-subject");
  const inputSearch = document.getElementById("input-search-subject");
  const mainContentSubject = document.getElementById("main-content-subject");
  const noDataContent = document.getElementById("no-data-content");

  mainContentSubject.style.display = "none";
  searchSubjectButton.addEventListener("click", function () {
    fetch("data/subjects.json")
      .then((response) => response.json())
      .then((data) => {
        if (inputSearch.value !== "") {
          let getSubjectCode = inputSearch.value.split(" ")[0];
          const validData = data.filter(
            (item) => item?.subject_code === getSubjectCode
          );
          if (validData.length > 0) {
            renderData(validData);
            mainContentSubject.style.display = "block";
            noDataContent.style.display = "none";
          }
        } else {
          mainContentSubject.style.display = "none";
          noDataContent.style.display = "block";
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  });

  function renderData(data) {
    const subjectTitle = document.getElementById("subject-title");
    const subjectCredit = document.getElementById("subject-credit");
    const subjectStudyTime = document.getElementById("subject-study-time");
    const subjectInstructor = document.getElementById("subject-instructor");
    const subjectContent = document.getElementById("subject-content");
    const titleSubjectQuestion = document.getElementById("title-subject-question");

    subjectStudyTime.innerHTML = "";
    subjectTitle.innerHTML =
      data[0].subject_code + " | " + data[0].subject_name;
    subjectCredit.innerHTML = "หน่วยกิต : " + data[0].credit;
    subjectInstructor.innerHTML = "ผู้สอน : " + data[0].instructor;
    subjectContent.innerHTML = "เนื้อหา : " + data[0].content;
    titleSubjectQuestion.innerHTML = "วิชา : " + data[0].subject_code + " | " + data[0].subject_name;

    data[0]?.study_time?.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `${item.day} เวลา ${item.start_time} - ${item.end_time}`;
      subjectStudyTime.appendChild(listItem);
    });
  }
});
