// fetch関数を自分で作る　非同期関数
export const fetcher = async (
    // RequestInfoとRequestInitのデータを受け取る
    resource: RequestInfo,
    init?: RequestInit,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
    // 非同期関数でリクエストを送る　fetch関数がawitつまり非同期で行われるので、
    // それを呼び出している1行目のfetcher関数自体もpromiseを使った非同期関数にする必要がある
    // fetch関数によって実行され、実行した結果がresで受け取られて、その結果がOKかどうかがオブジェクトの中（if以降）に入ってくる
    const res = await fetch(resource, init)

    if (!res.ok) {
        // レスポンスが失敗したときに例外を投げる
        const errorRes = await res.json()
        const error = new Error(
            errorRes.message ??'APIリクエスト中にエラーが発生しました',
        )

        throw error
    }

    // 通信に成功していればresponse jsonのデータをコンポーネント=fetcher関数の戻り値のデータとして返す
    return res.json()
}