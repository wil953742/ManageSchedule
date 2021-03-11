//firebase를 전역 변수로 참조
console.log(firebase)

//인증 서비스 제공 업체
var provider = new firebase.auth.GoogleAuthProvider();


///// 사용자 인증 /////

const auth = firebase.auth();

const whenSignedIn = document.getElementById('whenSignedIn');
const whenSignedOut = document.getElementById('whenSignedOut');

const signInBtn = document.getElementById('signInBtn');
const signOutBtn = document.getElementById('signOutBtn');

const userDetails = document.getElementById('userDetails');


/// 인증 이벤트 처리 

signInBtn.onclick = () => auth.signInWithPopup(provider);

signOutBtn.onclick = () => auth.signOut();

auth.onAuthStateChanged(user => {
    if (user) {
        // 사인 인 
        whenSignedIn.hidden = false;
        whenSignedOut.hidden = true;
        userDetails.innerHTML = `<h3>안녕하세요 ${user.displayName}!</h3> <p>사용자 아이디 : ${user.uid}</p>`;
    } else {
        // 사인인 안 했을때
        whenSignedIn.hidden = true;
        whenSignedOut.hidden = false;
        userDetails.innerHTML = '';
    }
});

/*
///// Firestore 데이터 베이스 연결 /////

const db = firebase.firestore();

const createThing = document.getElementById('createThing');
const somethingGoodList = document.getElementById('somethingGoodList');


let somethingGoodRef;
let unsubscribe;

auth.onAuthStateChanged(user => {

    if (user) {

        // 데이터 베이스 참고 
        somethingGoodRef = db.collection('managemyselfdb')

        createGood.onclick = () => {

            const { serverTimestamp } = firebase.firestore.FieldValue;

            somethingGoodRef.add({
                uid: user.uid,
                name: faker.commerce.productName(),
                createdAt: serverTimestamp()
            });
        }


        // 쿼리
        unsubscribe = somethingGoodRef
            .where('uid', '==', user.uid)
            .orderBy('createdAt') // 쿼리가 필요합니다.
            .onSnapshot(querySnapshot => {
                
                // 결과를 li 요소의 배열에 매핑

                const items = querySnapshot.docs.map(doc => {

                    return `<li>${doc.data().name}</li>`

                });

                somethingGoodList.innerHTML = items.join('');

            });



    } else {
        // 사용자가 로그 아웃하면 구독 취소
        unsubscribe && unsubscribe();
    }
});

*/