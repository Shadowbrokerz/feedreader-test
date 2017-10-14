$(function () {

    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('should have the url defined and not empty', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).toBeTruthy();
            });
        });


        /* loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('should have the name defined and not empty', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).toBeTruthy();

            });
        });
    });


    describe('The menu', function () {
        //declare variables
        let body = $('body');
        let menuButton = $('.menu-icon-link');

        /* ensures the menu element is hidden by default. */
        it('should check if the menu element is hidden by default', function () {
            expect($(body).attr('class')).toBe('menu-hidden');
        });

        /* ensures the menu changes visibility when the menu icon is clicked.*/
        it('ensures the menu changes visibility when clicked', function () {
            menuButton.click();
            expect($(body).attr('class')).not.toContain('menu-hidden');

            menuButton.click();
            expect($(body).attr('class')).toContain('menu-hidden');
        });
    });

    describe('Initial Entries', function () {

        //Before the feed loads.
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });

        /* ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        it('make sure there is at least 1 entry within the feed container', function (done) {
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });

        it("entry has a valid link", function (done) {
            let entries = $('.feed .entry-link');
            entries.each(function (i) {
                expect(entries[i].href).toMatch(/^(http|https):\/\//);
            });
            done();
        });

        describe('New Feed Selection', function () {
            let initialFeedContent;
            //Before the feed
            beforeEach(function (done) {
                loadFeed(0, function () {
                    initialFeedContent = $('feed').html();
                    //loads new feed.
                    loadFeed(1, function () {
                        done();
                    });
                });
            });

            /*
            *checks the loadFeed function that the content actually changes.
            */
            it("it changes feed content", function (done) {
                let newFeedcontent = $('.feed').html();
                expect(initialFeedContent).not.toBe(newFeedcontent);
                done();
            });
        });
    });
}());
