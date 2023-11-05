document.addEventListener('DOMContentLoaded', function() {
  const tabContainers = document.querySelectorAll('.pets');

  tabContainers.forEach(tabContainer => {
    const tabs = Array.from(tabContainer.querySelectorAll('.nav-link'));
    let currentTabIndex = tabs.findIndex(tab => tab.classList.contains('active'));
    const containerRect = tabContainer.getBoundingClientRect(); //gets container coordinates to check if it is visible

    document.addEventListener('keydown', function(event) {
      if (event.key === 'ArrowLeft') {
        currentTabIndex = (currentTabIndex - 1 + tabs.length) % tabs.length;
      } else if (event.key === 'ArrowRight') {
        currentTabIndex = (currentTabIndex + 1) % tabs.length;
      }

      tabs.forEach((tab, index) => {
        if (index === currentTabIndex) {
          tab.classList.add('active');
        } else {
          tab.classList.remove('active');
        }
      });

      const tabRect = tabs[currentTabIndex].getBoundingClientRect();
      if (tabRect.left < containerRect.left) {
        tabContainer.scrollLeft -= containerRect.left - tabRect.left;
      } else if (tabRect.right > containerRect.right) {
        tabContainer.scrollLeft += tabRect.right - containerRect.right;
      }
      const tabContent = tabContainer.querySelector('.tab-content');
      const newContent = tabContent.querySelectorAll('.tab-pane')[currentTabIndex].innerHTML;
      tabContent.querySelector('.active').innerHTML = newContent;
    });
  });
});

