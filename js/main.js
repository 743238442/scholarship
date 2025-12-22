// 神影视频网站主脚本

// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    console.log('神影视频网站加载完成');
    
    // 初始化轮播图
    const carousel = new bootstrap.Carousel(document.getElementById('carouselExampleIndicators'), {
        interval: 5000,
        pause: 'hover',
        wrap: true
    });
    
    // 搜索功能
    const searchInput = document.getElementById('searchInput');
    const searchType = document.getElementById('searchType');
    const searchButton = document.getElementById('searchButton');
    
    function performSearch() {
        const searchTerm = searchInput.value;
        const type = searchType.value;
        if (searchTerm.trim()) {
            // 获取类型名称
            const typeNames = {
                'all': '全部',
                'movies': '电影',
                'tv': '电视剧',
                'anime': '动漫',
                'variety': '综艺'
            };
            const typeName = typeNames[type] || '全部';
            alert(`在${typeName}中搜索: ${searchTerm}`);
            // 实际项目中可以跳转到搜索结果页
            // window.location.href = `search.html?q=${encodeURIComponent(searchTerm)}&type=${type}`;
        }
    }
    
    // 点击搜索按钮
    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }
    
    // 按下回车键
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // 电影卡片点击事件
    const movieCards = document.querySelectorAll('.movie-card');
    movieCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // 排除播放按钮的点击事件
            if (!e.target.closest('.btn-play')) {
                // 跳转到电影详情页
                window.location.href = 'movie-detail.html';
            }
        });
    });
    
    // 分类导航点击事件
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.querySelector('p').textContent;
            alert(`进入${category}分类`);
            // 实际项目中可以跳转到分类页
            // window.location.href = `category.html?type=${encodeURIComponent(category)}`;
        });
    });
    
    // 滚动监听，导航栏样式变化
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-lg');
            navbar.style.backgroundColor = 'rgba(52, 58, 64, 0.95)';
        } else {
            navbar.classList.remove('shadow-lg');
            navbar.style.backgroundColor = '#343a40';
        }
    });
    
    // 页面加载动画
    const fadeElements = document.querySelectorAll('.movie-card, .category-item');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });
});

// 工具函数
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function formatTime(date) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}

// 分享功能
function shareMovie(movieId, platform) {
    const shareUrl = window.location.href;
    const shareTitle = '快来看看这部精彩的电影！';
    
    switch(platform) {
        case 'weibo':
            window.open(`http://service.weibo.com/share/share.php?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}`, '_blank');
            break;
        case 'wechat':
            alert('请使用微信扫描二维码分享');
            break;
        case 'qq':
            window.open(`https://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}`, '_blank');
            break;
        default:
            alert('分享功能开发中');
    }
}

// 收藏功能
function toggleFavorite(movieId) {
    const button = event.target;
    button.classList.toggle('active');
    if (button.classList.contains('active')) {
        alert('已添加到收藏夹');
        // 实际项目中可以调用API保存到数据库
    } else {
        alert('已从收藏夹移除');
        // 实际项目中可以调用API从数据库删除
    }
}