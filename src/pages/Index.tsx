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
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');

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
            <a href="#" className="text-sm font-medium transition-colors hover:text-primary">Главная</a>
            <a href="#" className="text-sm font-medium transition-colors hover:text-primary">Новости</a>
            <a href="#" className="text-sm font-medium transition-colors hover:text-primary">Обзоры</a>
            <a href="#" className="text-sm font-medium transition-colors hover:text-primary">Статьи</a>
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
