import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useDesigner from '@/hooks/useDesigner';
import { AiOutlineClose } from 'react-icons/ai';

const PropertiesFormSidebar = () => {
  const { selectedElement, handleSelectedElement } = useDesigner();
  if (!selectedElement) return null;

  const { render } = selectedElement;
  const { EditablePropsForm, RulesForm } = render;

  return (
    <div className="flex flex-col p-2">
      <Tabs defaultValue="editable" className="w-full  ">
        <div className="flex items-center">
          <TabsList className="flex-grow flex justify-center  ">
            <TabsTrigger value="editable">Properties</TabsTrigger>
            <TabsTrigger value="rules">Rules</TabsTrigger>
          </TabsList>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => {
              handleSelectedElement(null);
            }}
          >
            <AiOutlineClose />
          </Button>
        </div>
        <Separator className="mb-4" />
        <TabsContent value="editable">
          <EditablePropsForm formFieldConfig={selectedElement} />
        </TabsContent>
        <TabsContent value="rules">
          <RulesForm formFieldConfig={selectedElement} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PropertiesFormSidebar;
