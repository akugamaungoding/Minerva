function loadDashboardData() {
    if (currentRole === 'admin') {
        loadAdminDashboardData();
    } else {
        loadClientDashboardData();
    }
}

function loadAdminDashboardData() {
    const stats = getAdminStats();
    
    animateCounter('totalProjects', stats.totalProjects);
    animateCounter('activeProjects', stats.activeProjects);
    animateCounter('completedTasks', stats.completedTasks);
    animateCounter('teamMembers', stats.totalUsers);
}

function loadClientDashboardData() {
    const stats = getClientStats();
    
    animateCounter('totalProjects', stats.myProjects);
    animateCounter('activeProjects', stats.activeProjects);
    animateCounter('completedTasks', stats.completedProjects);
    animateCounter('teamMembers', stats.pendingApprovals);
}

function animateCounter(elementId, targetValue) {
    const element = document.getElementById(elementId);
    const duration = 2000;
    const start = 0;
    const increment = targetValue / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= targetValue) {
            current = targetValue;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

function getAdminStats() {
    return {
        totalProjects: 15,
        activeProjects: 8,
        completedTasks: 234,
        totalUsers: 45
    };
}

function getClientStats() {
    return {
        myProjects: 3,
        activeProjects: 2,
        completedProjects: 1,
        pendingApprovals: 2
    };
}
