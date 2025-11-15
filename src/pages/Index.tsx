import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface Article {
  id: number;
  title: string;
  category: string;
  image: string;
  excerpt: string;
  author: string;
  date: string;
  comments: Comment[];
}

interface Comment {
  id: number;
  author: string;
  text: string;
  date: string;
}

interface ForumTopic {
  id: number;
  title: string;
  author: string;
  category: string;
  replies: number;
  views: number;
  lastActivity: string;
  posts: ForumPost[];
}

interface ForumPost {
  id: number;
  author: string;
  text: string;
  date: string;
}

const forumTopics: ForumTopic[] = [
  {
    id: 1,
    title: 'Какое масло лучше использовать для турбированных двигателей?',
    author: 'Сергей_М',
    category: 'Техническая помощь',
    replies: 24,
    views: 342,
    lastActivity: '2 часа назад',
    posts: [
      { id: 1, author: 'Сергей_М', text: 'Добрый день! Подскажите, какое масло лучше заливать в турбированный двигатель 2.0? Пробег 80 тыс км.', date: '15 ноября 2025, 10:15' },
      { id: 2, author: 'МеханикПро', text: 'Рекомендую 5W-40 синтетику. Главное — соблюдать интервалы замены каждые 7500 км.', date: '15 ноября 2025, 11:30' },
      { id: 3, author: 'AutoExpert', text: 'Согласен, синтетика обязательна. Я лью Mobil 1 уже 5 лет — никаких проблем.', date: '15 ноября 2025, 14:20' }
    ]
  },
  {
    id: 2,
    title: 'Выбор между BMW X5 и Audi Q7',
    author: 'Виктор2025',
    category: 'Выбор автомобиля',
    replies: 18,
    views: 256,
    lastActivity: '5 часов назад',
    posts: [
      { id: 4, author: 'Виктор2025', text: 'Не могу определиться между X5 F15 и Q7 первого поколения. Что надёжнее?', date: '14 ноября 2025, 16:40' },
      { id: 5, author: 'AudiLover', text: 'Q7 комфортнее, но X5 динамичнее. Зависит от приоритетов.', date: '14 ноября 2025, 18:15' }
    ]
  },
  {
    id: 3,
    title: 'Лучшие маршруты для автопутешествий по России',
    author: 'Путешественник',
    category: 'Общение',
    replies: 42,
    views: 589,
    lastActivity: 'вчера',
    posts: [
      { id: 6, author: 'Путешественник', text: 'Поделитесь проверенными маршрутами! Планирую поездку летом.', date: '13 ноября 2025, 09:00' },
      { id: 7, author: 'РоссияНаКолёсах', text: 'Рекомендую Золотое Кольцо — классика! Дороги хорошие, много достопримечательностей.', date: '13 ноября 2025, 12:30' }
    ]
  }
];

const articles: Article[] = [
  {
    id: 1,
    title: 'Новый Ferrari SF90 Stradale: гибридная революция',
    category: 'Обзоры',
    image: 'https://cdn.poehali.dev/projects/e824e22c-5678-4fbe-9f2b-15efcf8cc1d7/files/a841dbe4-20f9-4eb4-8b42-65244c9c5454.jpg',
    excerpt: 'Первый серийный гибрид от Ferrari развивает 1000 л.с. и разгоняется до 100 км/ч за 2.5 секунды. Революция в мире суперкаров началась.',
    author: 'Александр Петров',
    date: '15 ноября 2025',
    comments: [
      { id: 1, author: 'Иван М.', text: 'Невероятная машина! Мечта любого автолюбителя.', date: '15 ноября 2025, 14:30' },
      { id: 2, author: 'Мария К.', text: 'А расход топлива какой в гибридном режиме?', date: '15 ноября 2025, 15:45' }
    ]
  },
  {
    id: 2,
    title: 'Tesla Model Y 2025: что нового?',
    category: 'Новости',
    image: 'https://cdn.poehali.dev/projects/e824e22c-5678-4fbe-9f2b-15efcf8cc1d7/files/6f7d071a-5d98-4ddc-bae5-cbf50f23aaed.jpg',
    excerpt: 'Обновленная версия популярного электрокроссовера получила увеличенный запас хода и улучшенную систему автопилота.',
    author: 'Елена Соколова',
    date: '14 ноября 2025',
    comments: [
      { id: 3, author: 'Дмитрий В.', text: 'Жду тест-драйв!', date: '14 ноября 2025, 18:20' }
    ]
  },
  {
    id: 3,
    title: 'Легенды 60-х: обзор классики',
    category: 'Статьи',
    image: 'https://cdn.poehali.dev/projects/e824e22c-5678-4fbe-9f2b-15efcf8cc1d7/files/7a2f295a-6418-46a9-9949-f3cecf909818.jpg',
    excerpt: 'Погружаемся в эпоху золотого века автомобилестроения. Какие машины остались в сердцах коллекционеров навсегда?',
    author: 'Сергей Николаев',
    date: '13 ноября 2025',
    comments: []
  }
];

export default function Index() {
  const [currentSection, setCurrentSection] = useState<'blog' | 'forum'>('blog');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<ForumTopic | null>(null);
  const [showNewTopicDialog, setShowNewTopicDialog] = useState(false);
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [newTopicCategory, setNewTopicCategory] = useState('Общение');
  const [newTopicText, setNewTopicText] = useState('');
  const [forumPostName, setForumPostName] = useState('');
  const [forumPostText, setForumPostText] = useState('');

  const filteredArticles = selectedCategory === 'Все' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  const handleAddComment = () => {
    if (selectedArticle && commentName && commentText) {
      const newComment: Comment = {
        id: Date.now(),
        author: commentName,
        text: commentText,
        date: new Date().toLocaleString('ru-RU', { 
          day: 'numeric', 
          month: 'long', 
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };
      
      selectedArticle.comments.push(newComment);
      setCommentName('');
      setCommentText('');
    }
  };

  const handleCreateTopic = () => {
    if (newTopicTitle && newTopicText && commentName) {
      const newTopic: ForumTopic = {
        id: Date.now(),
        title: newTopicTitle,
        author: commentName,
        category: newTopicCategory,
        replies: 0,
        views: 0,
        lastActivity: 'только что',
        posts: [
          {
            id: Date.now(),
            author: commentName,
            text: newTopicText,
            date: new Date().toLocaleString('ru-RU', { 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })
          }
        ]
      };
      forumTopics.unshift(newTopic);
      setNewTopicTitle('');
      setNewTopicText('');
      setNewTopicCategory('Общение');
      setShowNewTopicDialog(false);
    }
  };

  const handleAddForumPost = () => {
    if (selectedTopic && forumPostName && forumPostText) {
      const newPost: ForumPost = {
        id: Date.now(),
        author: forumPostName,
        text: forumPostText,
        date: new Date().toLocaleString('ru-RU', { 
          day: 'numeric', 
          month: 'long', 
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };
      selectedTopic.posts.push(newPost);
      selectedTopic.replies++;
      setForumPostName('');
      setForumPostText('');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Car" className="text-primary" size={32} />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              AutoBlog
            </h1>
          </div>
          <nav className="hidden md:flex gap-6">
            <button 
              onClick={() => { setCurrentSection('blog'); setSelectedArticle(null); setSelectedTopic(null); }}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                currentSection === 'blog' ? 'text-primary' : ''
              }`}
            >
              Блог
            </button>
            <button 
              onClick={() => { setCurrentSection('forum'); setSelectedArticle(null); setSelectedTopic(null); }}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                currentSection === 'forum' ? 'text-primary' : ''
              }`}
            >
              Форум
            </button>
          </nav>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Icon name="Menu" size={24} />
          </Button>
        </div>
      </header>

      <section className="relative h-[500px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${articles[0].image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>
        <div className="relative container h-full flex items-center">
          <div className="max-w-2xl animate-fade-in">
            <Badge className="mb-4 bg-primary text-primary-foreground">
              {articles[0].category}
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {articles[0].title}
            </h2>
            <p className="text-lg text-gray-200 mb-6">
              {articles[0].excerpt}
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
              onClick={() => setSelectedArticle(articles[0])}
            >
              Читать полностью
              <Icon name="ArrowRight" className="ml-2" size={20} />
            </Button>
          </div>
        </div>
      </section>

      <main className="container py-12">
        {currentSection === 'forum' ? (
          <div>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">Форум автолюбителей</h2>
                <p className="text-muted-foreground">Обсуждайте автомобили, делитесь опытом и находите единомышленников</p>
              </div>
              {!selectedTopic && (
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-primary to-secondary"
                  onClick={() => setShowNewTopicDialog(true)}
                >
                  <Icon name="Plus" className="mr-2" size={20} />
                  Создать тему
                </Button>
              )}
            </div>

            {showNewTopicDialog && (
              <Card className="mb-8 animate-scale-in">
                <CardHeader>
                  <CardTitle>Создать новую тему</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input 
                    placeholder="Ваше имя"
                    value={commentName}
                    onChange={(e) => setCommentName(e.target.value)}
                  />
                  <Input 
                    placeholder="Название темы"
                    value={newTopicTitle}
                    onChange={(e) => setNewTopicTitle(e.target.value)}
                  />
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={newTopicCategory}
                    onChange={(e) => setNewTopicCategory(e.target.value)}
                  >
                    <option>Общение</option>
                    <option>Техническая помощь</option>
                    <option>Выбор автомобиля</option>
                    <option>Тюнинг</option>
                  </select>
                  <Textarea 
                    placeholder="Текст сообщения..."
                    value={newTopicText}
                    onChange={(e) => setNewTopicText(e.target.value)}
                    rows={6}
                  />
                </CardContent>
                <CardFooter className="gap-2">
                  <Button 
                    className="flex-1 bg-gradient-to-r from-primary to-secondary"
                    onClick={handleCreateTopic}
                    disabled={!commentName || !newTopicTitle || !newTopicText}
                  >
                    Создать тему
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setShowNewTopicDialog(false)}
                  >
                    Отмена
                  </Button>
                </CardFooter>
              </Card>
            )}

            {selectedTopic ? (
              <div className="animate-fade-in">
                <Button 
                  variant="ghost" 
                  className="mb-4"
                  onClick={() => setSelectedTopic(null)}
                >
                  <Icon name="ArrowLeft" className="mr-2" size={20} />
                  Назад к темам
                </Button>
                
                <Card className="mb-6">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge>{selectedTopic.category}</Badge>
                      <span className="text-sm text-muted-foreground">
                        <Icon name="Eye" className="inline mr-1" size={14} />
                        {selectedTopic.views} просмотров
                      </span>
                    </div>
                    <CardTitle className="text-3xl">{selectedTopic.title}</CardTitle>
                  </CardHeader>
                </Card>

                <div className="space-y-4 mb-8">
                  {selectedTopic.posts.map((post, index) => (
                    <Card key={post.id} className="animate-scale-in">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>
                              {post.author.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium">{post.author}</p>
                            <p className="text-sm text-muted-foreground">{post.date}</p>
                          </div>
                          {index === 0 && (
                            <Badge variant="outline">Автор темы</Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="leading-relaxed">{post.text}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Ответить в теме</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input 
                      placeholder="Ваше имя"
                      value={forumPostName}
                      onChange={(e) => setForumPostName(e.target.value)}
                    />
                    <Textarea 
                      placeholder="Ваше сообщение..."
                      value={forumPostText}
                      onChange={(e) => setForumPostText(e.target.value)}
                      rows={4}
                    />
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full bg-gradient-to-r from-primary to-secondary"
                      onClick={handleAddForumPost}
                      disabled={!forumPostName || !forumPostText}
                    >
                      <Icon name="Send" className="mr-2" size={18} />
                      Отправить ответ
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ) : (
              <div className="space-y-4">
                {forumTopics.map((topic, index) => (
                  <Card 
                    key={topic.id}
                    className="hover:shadow-lg transition-shadow cursor-pointer animate-scale-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                    onClick={() => setSelectedTopic(topic)}
                  >
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <Avatar className="mt-1">
                          <AvatarFallback>
                            {topic.author.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge>{topic.category}</Badge>
                          </div>
                          <CardTitle className="text-xl mb-2 hover:text-primary transition-colors">
                            {topic.title}
                          </CardTitle>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Icon name="User" size={14} />
                              {topic.author}
                            </span>
                            <span className="flex items-center gap-1">
                              <Icon name="MessageSquare" size={14} />
                              {topic.replies} ответов
                            </span>
                            <span className="flex items-center gap-1">
                              <Icon name="Eye" size={14} />
                              {topic.views} просмотров
                            </span>
                            <span className="flex items-center gap-1">
                              <Icon name="Clock" size={14} />
                              {topic.lastActivity}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            )}
          </div>
        ) : (
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="Все">Все</TabsTrigger>
            <TabsTrigger value="Новости">Новости</TabsTrigger>
            <TabsTrigger value="Обзоры">Обзоры</TabsTrigger>
            <TabsTrigger value="Статьи">Статьи</TabsTrigger>
          </TabsList>
        </Tabs>

        {selectedArticle ? (
          <div className="animate-fade-in">
            <Button 
              variant="ghost" 
              className="mb-4"
              onClick={() => setSelectedArticle(null)}
            >
              <Icon name="ArrowLeft" className="mr-2" size={20} />
              Назад к статьям
            </Button>
            
            <article className="max-w-4xl mx-auto">
              <img 
                src={selectedArticle.image} 
                alt={selectedArticle.title}
                className="w-full h-[400px] object-cover rounded-lg mb-6"
              />
              
              <div className="flex items-center gap-4 mb-6">
                <Avatar>
                  <AvatarFallback>{selectedArticle.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{selectedArticle.author}</p>
                  <p className="text-sm text-muted-foreground">{selectedArticle.date}</p>
                </div>
                <Badge className="ml-auto">{selectedArticle.category}</Badge>
              </div>

              <h1 className="text-4xl font-bold mb-6">{selectedArticle.title}</h1>
              <p className="text-lg leading-relaxed mb-8">{selectedArticle.excerpt}</p>

              <div className="border-t pt-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Icon name="MessageSquare" size={28} />
                  Комментарии ({selectedArticle.comments.length})
                </h2>

                <div className="space-y-4 mb-8">
                  {selectedArticle.comments.map(comment => (
                    <Card key={comment.id} className="animate-scale-in">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">
                              {comment.author.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{comment.author}</p>
                            <p className="text-xs text-muted-foreground">{comment.date}</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">{comment.text}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Добавить комментарий</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input 
                      placeholder="Ваше имя"
                      value={commentName}
                      onChange={(e) => setCommentName(e.target.value)}
                    />
                    <Textarea 
                      placeholder="Ваш комментарий..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      rows={4}
                    />
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full bg-gradient-to-r from-primary to-secondary"
                      onClick={handleAddComment}
                      disabled={!commentName || !commentText}
                    >
                      <Icon name="Send" className="mr-2" size={18} />
                      Отправить
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </article>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article, index) => (
              <Card 
                key={article.id} 
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer animate-scale-in group"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedArticle(article)}
              >
                <div className="relative overflow-hidden h-48">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                    {article.category}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {article.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Icon name="User" size={16} />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="MessageSquare" size={16} />
                    <span>{article.comments.length}</span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
        )}
      </main>

      <footer className="border-t mt-20">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Icon name="Car" className="text-primary" size={24} />
              <span className="font-bold">AutoBlog</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 AutoBlog. Все материалы защищены.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon">
                <Icon name="Facebook" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Twitter" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Instagram" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}