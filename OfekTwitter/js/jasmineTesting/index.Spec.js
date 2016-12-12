describe("createTweets", function () {

    userId = "10c06b27-d8ee-4435-9cee-0a2a838ca14a";
    userName = "Marta";

    it("tweets was not created user not follows them", function () {

        lastTweets = [
            {
                "text": "Hello",
                "user": "ff2b41b9-e1d8-4594-9aa3-c1dda30b0d22"
            },
            {
                "text": "Bye",
                "user": "ff2b41b9-e1d8-4594-9aa3-c1dda30b0d22"
            }
        ];

        spyOn(window, 'createTweet');
        createTweets();
        expect(window.createTweet).not.toHaveBeenCalled();
    });

    it("tweets was created user follows them", function () {

        lastTweets = [
            {
                "text": "Hello",
                "user": "cc707c95-f1e3-4caf-906d-f9dd1f394b99"
            },
            {
                "text": "Bye",
                "user": "10c06b27-d8ee-4435-9cee-0a2a838ca14a"
            }
        ];

        spyOn(window, 'createTweet');
        createTweets();
        expect(window.createTweet).toHaveBeenCalled();
    });

    it("tweets was not created last tweets array is empty", function () {

        lastTweets = [];
        spyOn(window, 'createTweet');
        createTweets();
        expect(window.createTweet).not.toHaveBeenCalled();
    });
});