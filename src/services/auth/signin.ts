// typesは後ほど定義
import { ApiContext, User } from 'types'
// 先に定義したsrc/utils/index.tsから読み込み
import { fetcher } from 'utils'

// signinのパラメータSigninParams　props受け取り時にtype定義
export type SigninParams = {
    /**
     * ユーザー名
     * サンプルユーザーのユーザー名は"user"
     */
    username: string
    /**
     * パスワード
     * サンプルユーザーのパスワードは"password"
     */
    password: string
}

/**
 * 認証API（サインイン）
 * @param context APIコンテキスト
 * @param params パラメータ
 * @returns ログインユーザー
 */
// 認証関数は非同期でApiContextとSigninParamsを受け取る
const signin = async (
    context: ApiContext,
    // ↓例えばユーザー一覧を取りに行きたいのであればユーザーの情報を取ってくるためのパラメーターを指定
    params: SigninParams,
): Promise<User> => {
    // fetcher関数（6.2.1で作ったsrc/utils/index.tsの関数）を呼び出して通信を作っていく
    return await fetcher(
        // ↓fetcher関数の接続先サーバー（URL）　繋ぐ先のURLを確認　ここではサーバーのauth/signinに繋ぎにいく
        `${context.apiRootUrl.replace(/\/$/g,'')}/auth/signin`,
        {
            // 送るならPOST、引っ張ってくるならGET
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            // パラメーターをJSONで渡す
            body:JSON.stringify(params),
        },
    )
}

export default signin