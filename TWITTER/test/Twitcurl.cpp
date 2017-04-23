/**
 * Tweet by twitcurl
 */
#include <iostream>
#include <string>
#include <twitcurl.h>

using namespace std;

/*
 * [CLASS] Process
 */
class Proc
{
    twitCurl twitterObj;
    string strConsumerKey, strConsumerSecret;
    string strAccessTokenKey, strAccessTokenSecret;
    string strReplyMsg;
public:
    Proc();                 // Constructor
    bool execMain(string);  // Main Process
};

/*
 * Proc - Constructor
 */
Proc::Proc()
{
    /// Initialize
    strConsumerKey       = "your_consumer_key";
    strConsumerSecret    = "your_consumer_secret";
    strAccessTokenKey    = "your_access_token";
    strAccessTokenSecret = "your_access_token_secret";
}

/*
 * Main Process
 */
bool Proc::execMain(string strString)
{
    try {
        // Set Twitter consumer key and secret,
        //   OAuth access token key and secret
        twitterObj.getOAuth().setConsumerKey(strConsumerKey);
        twitterObj.getOAuth().setConsumerSecret(strConsumerSecret);
        twitterObj.getOAuth().setOAuthTokenKey(strAccessTokenKey);
        twitterObj.getOAuth().setOAuthTokenSecret(strAccessTokenSecret);

        // Verify account credentials
        if (!twitterObj.accountVerifyCredGet()) {
            twitterObj.getLastCurlError(strReplyMsg);
            cerr << "\ntwitCurl::accountVerifyCredGet error:\n"
                 << strReplyMsg.c_str() << endl;
            return false;
        }

        // Post a message
        strReplyMsg = "";
        if (!twitterObj.statusUpdate(strString)) {
            twitterObj.getLastCurlError(strReplyMsg);
            cerr << "\ntwitCurl::statusUpdate error:\n"
                 << strReplyMsg.c_str() << endl;
            return false;
        }
    } catch (char *e) {
        cerr << "[EXCEPTION] " << e << endl;
        return false;
    }
    return true;
}

/*
 * Execution
 */
int main(int argc, char* argv[]){
    try {
        if (argc != 2) {
            cout << "Usage: ./Twitcurl sentence" << endl;
            return true;
        }
        Proc objMain;
        bool bRet = objMain.execMain(argv[1]);
        if (!bRet) cout << "ERROR!" << endl;
    } catch (char *e) {
        cerr << "[EXCEPTION] " << e << endl;
        return 1;
    }
    return 0;
}
