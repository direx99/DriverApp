import { StyleSheet, Text, View } from 'react-native'

const styles = StyleSheet.create({
    ScreenContainer: {
        flex: 1,
        backgroundColor: '#101010'
    },

    FirstFlex: {
        flex: 1,
        marginTop: -50,
        paddingTop:20

    },
    SecondFlex: {
        flex: 1,
        padding: 20,
        padding: "10%",
        marginTop: 90
    },

    img1Style: {
        width: '90%',
        resizeMode: 'contain',
        marginLeft: '10%',
        marginBottom: "-22%"


    },

    img2Style: {
        width: '90%',
        resizeMode: 'contain',
        marginRight: '10%',
        marginBottom: "-22%"

    },
    TitleStyle: {
        fontSize: 35,
        color: '#fff',
        fontWeight: '800'
    },

    Title2Style: {
        fontSize: 16,
        color: '#fff',
        marginTop: 20,
        fontWeight: '500'

    },

    bgImgStyle: {
        width: '100%',
        resizeMode: 'contain'

    },
    bgStyle: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },

    TitlelLogin: {
        fontSize: 30,
        color: '#fff',
        fontWeight: '800',
        textAlign: 'center'
    },

    flexStyle: {
        flexDirection: 'row',
        width: 300,
        height: 45,
        backgroundColor: '#D9D9D9',
        borderRadius: 15,
        gap: 20

    },

    iconFill: {
        width: 45,
        height: 45,
        backgroundColor: '#A4D357',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center'

    },

    iconStyle: {
        width: 22,
        height: 22
    },

    inputStyle: {
        fontSize: 15

    },

    forgotPw: {
        color: '#fff',
        fontSize: 12,
        marginTop: 30,
        textAlign: 'center'

    },

    ruler: {
        width: '45%',
        height: 1,
        backgroundColor: '#fff',
        opacity: 0.7

    },

    orStyle: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 13

    },

    btnStyle: {
        width: 220,
        height: 37,
        backgroundColor: '#A4D357',
        alignSelf: 'center',
        marginTop: 30,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',

    },

    loginStyle: {
        color: '#fff',
        fontWeight: '800',
        fontSize: 15,

    },

    busStyle: {
        width: 270,
        resizeMode: 'contain',
        marginTop: -100,
        
    },

    signupStyle:{
        color: '#fff',
        fontSize: 12,
        textAlign: 'center',

    },
    signupStyle1:{
        color: '#A4D357',
        fontSize: 12,
        textAlign: 'center',
        fontWeight:'600'
    }





})

export { styles }