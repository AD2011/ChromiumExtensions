(function() {
    'use strict';
    // Function to extract season and episode numbers from the IMDb page
    function extractSeasonEpisode() {
        const seasonEpisodeDiv = document.querySelector('[data-testid="hero-subnav-bar-season-episode-numbers-section"]');
        if (seasonEpisodeDiv) {
            const seasonEpisodeText = seasonEpisodeDiv.textContent.trim();
            const match = seasonEpisodeText.match(/S(\d+).E(\d+)/);
            if (match) {
                return {
                    season: match[1],
                    episode: match[2]
                };
            }
        }
        return null;
    }
    
    // Function to extract the series ID from the IMDb page
    function extractSeriesId() {
        const seriesLink = document.querySelector('[data-testid="hero-title-block__series-link"]');
        if (seriesLink) {
            const href = seriesLink.getAttribute('href');
            const match = href.match(/\/title\/(tt\d+)\//);
            if (match) {
                return match[1];
            }
        }
        return null;
    }
    
    // Create a function to open the specified URL in a new tab for episodes
    function redirectToEpisode() {
        const seasonEpisode = extractSeasonEpisode();
        const seriesId = extractSeriesId();
        if (seasonEpisode && seriesId) {
            const { season, episode } = seasonEpisode;
            const vidsrcUrl = `https://vidsrc.cc/v2/embed/tv/${seriesId}/${season}/${episode}`;
            window.open(vidsrcUrl, '_blank');
        }
    }
    
    // Create a function to open the specified URL in a new tab for movies or series
    function redirectToVidSrc() {
        const imdbId = window.location.pathname.split('/')[2];
        const isMovie = document.title.indexOf('TV Series') === -1;
        const isEpisode = document.title.indexOf('TV Episode') === -1;
        let vidsrcUrl;
        
        if (isMovie && isEpisode) {
            vidsrcUrl = `https://vidsrc.cc/v2/embed/movie/${imdbId}`;
        } else {
            if (isMovie) {
                redirectToEpisode();
                return;
            } else {
                vidsrcUrl = `https://vidsrc.cc/v2/embed/tv/${imdbId}`;
            }
        }
        window.open(vidsrcUrl, '_blank');
    }
    
    // Create the button element
    const button = document.createElement('button');
    button.textContent = '📽 Watch on VidSrc';
    button.style.fontFamily = 'Arial';
    button.style.position = 'fixed';
    button.style.bottom = '10px';
    button.style.right = '10px';
    button.style.padding = '10px';
    button.style.background = '#125784';
    button.style.color = '#bad8eb';
    button.style.border = 'none';
    button.style.cursor = 'pointer';
    button.style.fontWeight = 'bold';
    button.style.borderRadius = '6px';
    button.style.zIndex = '9999';
    button.style.filter = 'drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))';
    
    // Add a click event listener to the button
    button.addEventListener('click', redirectToVidSrc);
    
    // Append the button to the body of the page
    document.body.appendChild(button);
})();