import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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

interface BlogSectionProps {
  articles: Article[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedArticle: Article | null;
  setSelectedArticle: (article: Article | null) => void;
  commentName: string;
  setCommentName: (name: string) => void;
  commentText: string;
  setCommentText: (text: string) => void;
  handleAddComment: () => void;
}

export default function BlogSection({
  articles,
  selectedCategory,
  setSelectedCategory,
  selectedArticle,
  setSelectedArticle,
  commentName,
  setCommentName,
  commentText,
  setCommentText,
  handleAddComment
}: BlogSectionProps) {
  const filteredArticles = selectedCategory === 'Все' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  return (
    <>
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
    </>
  );
}
