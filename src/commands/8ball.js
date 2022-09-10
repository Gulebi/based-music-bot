module.exports.run = (client, message) => {
    const responses = [
        "Бесспорно",
        "Предрешено",
        "Никаких сомнений",
        "Определённо да",
        "Можешь быть уверен в этом",
        "Мне кажется — «да»",
        "Вероятнее всего",
        "Хорошие перспективы",
        "Знаки говорят — «да»",
        "Да",
        "Пока не ясно, попробуй снова",
        "Спроси позже",
        "Лучше не рассказывать",
        "Сейчас нельзя предсказать",
        "Сконцентрируйся и спроси опять",
        "Даже не думай",
        "Мой ответ — «нет»",
        "По моим данным — «нет»",
        "Перспективы не очень хорошие",
        "Весьма сомнительно",
    ];

    const Response = responses[Math.floor(Math.random() * responses.length)];
    message.channel.send(`🎱 | ${Response}, **${message.author.username}**`);
};

module.exports.data = {
    name: "8ball",
    description: "",
    aliases: ["8"],
};