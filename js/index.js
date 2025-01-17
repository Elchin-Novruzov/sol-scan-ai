import { ApiClient, SolanaWalletApi, BalanceRequest } from 'theblockchainapi';

let defaultClient = ApiClient.instance;
let APIKeyID = defaultClient.authentications['APIKeyID'];
let APISecretKey = defaultClient.authentications['APISecretKey'];

// BEGIN: Fill in with your own API Keys
APIKeyID.apiKey = 'FFILti5sWS9kN2s';
APISecretKey.apiKey = 'QfIKvAduvE6ZU3P';
// END

let apiInstance = new SolanaWalletApi();

let BadgeCount = 0;
let commonBadges = [];
let rareBadges = [];
let epicBadges = [];
let platinBadges = [];
// Function to retrieve SOL balance
async function getBalance(publicKey) {
    try {
        const balance_request = new BalanceRequest();
        balance_request.public_key = publicKey;
        balance_request.network = 'mainnet-beta'; // Use 'devnet' for test network
        balance_request.unit = 'sol';

        const balance_result = await apiInstance.solanaGetBalance({ 'balanceRequest': balance_request });
        return balance_result.balance;
    } catch (error) {
        console.error("Error retrieving balance:", error);
        return null;
    }
}

// Event listener for the form submission
document.getElementById('analyzeBtn').addEventListener('click', async (event) => {
    event.preventDefault(); // Prevent form from refreshing the page
    const publicKey = document.getElementById('publicKey').value.trim();
    const displayBadges = document.getElementById('displayBadges');

    if (!publicKey) {
        document.getElementById('result').textContent = "Please enter a valid public key.";
        return;
    }

    document.getElementById('result').textContent = "Fetching balance...";
    const balance = await getBalance(publicKey);

    if (balance === null) {
        document.getElementById('result').textContent = "Error while analyzing your wallet. Please check the wallet ID and try again in 10 seconds.";
        return;
    }

    document.getElementById('result').textContent = `SOL Balance: ${balance}`;

    document.getElementById('avatarFirst').classList.add('displayOff');
    document.getElementById('avatarFirst').classList.remove('displayOn');
    document.getElementById('avatarSecond').classList.add('displayOn');
    document.getElementById('avatarSecond').classList.remove('displayOff');

    document.getElementById('analysis').classList.add('displayOff');
    document.getElementById('analysis').classList.remove('displayOn');

    
    

    // If balance is greater than 0.1 SOL, update the element with #SOLHodlerJr
    // const SOLHodlerJr = document.getElementById('SOLHodlerJr');
    // if (parseFloat(balance) > 0.1) {
    //     SOLHodlerJr.classList.add('unlocked');
    //     SOLHodlerJr.classList.remove('locked');
    //     BadgeCount++
    //     commonBadges.push('SOL Hodler Jr');
    // } else {
    //     SOLHodlerJr.classList.add('locked');
    //     SOLHodlerJr.classList.remove('unlocked'); // Remove the class if balance <= 1
    // }

    // If balance is greater than 1 SOL, update the element with #SolHolder
    const SolHolder = document.getElementById('SolHolder');
    const SolHolderLocked = document.getElementById('SolHolderLocked');
    if (parseFloat(balance) > 1) {
        SolHolder.classList.add('unlocked');
        SolHolder.classList.remove('locked');
        SolHolderLocked.classList.add('locked');
        SolHolderLocked.classList.remove('unlocked');
        BadgeCount++
        commonBadges.push('Sol Holder');
    } else {
        SolHolder.classList.add('locked');
        SolHolder.classList.remove('unlocked'); // Remove the class if balance <= 1
        SolHolderLocked.classList.add('unlocked');
        SolHolderLocked.classList.remove('locked');
    }

    // If balance is greater than 10 SOL, update the element with #RichlistDreams
    // const RichlistDreams = document.getElementById('RichlistDreams');
    // if (parseFloat(balance) > 10) {
    //     RichlistDreams.classList.add('unlocked');
    //     RichlistDreams.classList.remove('locked');
    //     BadgeCount++
    //     rareBadges.push('Richlist Dreams');
    // } else {
    //     RichlistDreams.classList.add('locked');
    //     RichlistDreams.classList.remove('unlocked'); // Remove the class if balance <= 1
    // }

    // If balance is greater than 50 SOL, update the element with #RichlistDreams
    // const RichlistStatus = document.getElementById('RichlistStatus');
    // if (parseFloat(balance) > 50) {
    //     RichlistStatus.classList.add('unlocked');
    //     RichlistStatuss.classList.remove('locked');
    //     BadgeCount++
    //     epicBadges.push('Richlist Status');
    // } else {
    //     RichlistStatus.classList.add('locked');
    //     RichlistStatus.classList.remove('unlocked'); // Remove the class if balance <= 1
    // }
    
    // If balance is greater than 1,000 SOL, update the element with #SolHero
    const SolMillionaire = document.getElementById('SolMillionaire');
    if (parseFloat(balance) > 1000) {
        SolMillionaire.classList.add('unlocked');
        SolMillionaire.classList.remove('locked');
        BadgeCount++
        epicBadges.push('Sol Millionaire');
    } else {
        SolMillionaire.classList.add('locked');
        SolMillionaire.classList.remove('unlocked'); // Remove the class if balance <= 1
    }




    /************************************************
    ********** Display/Hide the elements ************
    ************************************************/
    

    displayBadges.textContent = `${BadgeCount}/50`;
    document.getElementById('wallet').textContent = publicKey;
    document.getElementById('alertSuccessText').textContent = `Aww yeah, you successfully complacte to wallet analysis and you got ${BadgeCount} achievements over 50 achievements!!! Keep going and share your highest achivement on the X(Twitter) with your friends!`;
    
    if (BadgeCount > 0) {
            document.querySelector('#alertSuccess').classList.add('displayOn');
            document.querySelector('#alertSuccess').classList.remove('displayOff');
            document.getElementById('unlockedInfo').classList.add('displayOff');
        } else if (BadgeCount === 0) {
            document.querySelector('#alertWrong').classList.add('displayOn');
            document.querySelector('#alertWrong').classList.remove('displayOff');
    }

    if (platinBadges.length > 0) {
        document.getElementById('cardPlatinum').classList.add('displayOn');
    } else if (epicBadges.length > 0) {
        document.getElementById('cardGold').classList.add('displayOn');
    } else if (rareBadges.length > 0) {
        document.getElementById('cardSilver').classList.add('displayOn');
    } else if (commonBadges.length > 0) {
        document.getElementById('cardBronze').classList.add('displayOn');
    }

});
