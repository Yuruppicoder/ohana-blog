import Card from "@/components/Card";


const AboutPage = () => {
  return (
    <main>
      <div className="p-5 mx-auto max-w-2xl flex flex-col items-center">
        <h2 className="my-5 font-bold text-3xl">私の自己紹介</h2>
        <p className="mb-5">
          <span className="animate-bounce inline-block">👇</span> マウスを上からホバーしてみてね！スマホのタッチでも行けるよ！
        </p>
        <Card
          header="Ohana"
          content="Ohanaの毎日の成長・学びを日記につづっていきます。"
          image="http://localhost:3000/Ohana_logo.jpg"
        />
        <div className="py-5 mt-10">
          <p className="text-lg">
            こんにちわ。Ohanaです。
            <br />
            このOhana（おはな）という名前は、私のペットの名前です。
          </p>
          <h3 className="text-2xl font-bold text-center py-5 mt-5">
            Ohana日記とは?
          </h3>
          <p className=" tracking-widest text-lg">
            このOhana日記は、私の毎日の経験を日記にメモして、記録をつけていきます！
            日々、生活している中で、たくさんのことを気づいたり、学んだりします。
            それを毎日の成長としてこの日記につづっていきたいと思います。
          </p>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;
