/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    /* SUITE 1 - Make sure all predefined objects have been valued completely. */
    describe('RSS Feeds', function() {

         /* TEST 1 - Check that all 'allFeeds' array exists and
          * is NOT empty.
          */
         it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
         });


         /* TEST 2 - Check that all URLs in the defined 'allFeeds'
          * array have a set value.
          */
         it('URLs configured', function(){

            allFeeds.forEach( function(rss) { 
                expect(rss.url).toBeDefined();
                expect(rss.url.length).not.toBe(0);
            })
         });


        /* TEST 3 - Check that all Feeds in the defined 'allFeeds'
         * array have a name defined.
         */
        it('Feeds contain names', function(){
            allFeeds.forEach( function(rss) { 
                expect(rss.name).toBeDefined();
                expect(rss.name.length).not.toBe(0);
            })
        });
    });


    /* SUITE 2 - Make Menu functions properly, displaying and hiding correctly. */
    describe('Menu Test', function() {

        /* TEST 4 - Make sure the Menu is hidden as the default. */
        it('Menu Is Hidden', function() {
            expect($('.menu').position().left).not.toBe(0);
        });

        /* TEST 5 - Test the Menu Click event handler making sure the Menu
         * opens when it is clicked and then hidden when clicked again (aka toggled).
         */
        it('Menu Display and Hide', function() {
             $('.menu-icon-link').trigger( "click" );
             expect(document.body.classList.contains('menu-hidden')).toBeFalsy();            
             $('.menu-icon-link').trigger( "click" );
             expect(document.body.classList.contains('menu-hidden')).toBeTruthy();            
        });

     });


    /* SUITE 3 - Test the RSS Feed Load functionality. */
    describe('Initial Entries', function() {

       /* Call the loadFeed function using the default feed.id = 0 */
       beforeEach(function (done) {
            // Make an async call, passing the special done callback        
            loadFeed(0,done);
        });

        /* TEST 6 - Test the 'loadFeed' asynchronous function to determine if it 
         * works correctly from start to finish. It will a set number of feed entries 
         * for a given RSS Feed URL. A successful test will produce 1 or more entries.
         */
        it("loadFeed successful all feeds loaded", function (done) {
            expect($('.entry-link').length >= 1).toBeTruthy();
            done();
        });
    });
    
    /* SUITE 4 - Test the new Feed selection and page loading. */
    describe('New Feed Selection', function() {

        /* Save current page header of the default page which is feed.id = 0,
         * then call loadFeed function to load feed.id = 1 */
        var hdrTitle;
        beforeEach(function(done) {
            hdrTitle = $('.header-title').html();
            loadFeed(1,done);
        });

        /* TEST 7 - Test to make sure that choosing a different RSS Feed to load will
         * properly replace current RSS Feed entries on the page.
         */
        it("Feed content changes", function(done) {
            expect($('.header-title').html()).not.toBe(hdrTitle);
            done();
        });

    });

}());
