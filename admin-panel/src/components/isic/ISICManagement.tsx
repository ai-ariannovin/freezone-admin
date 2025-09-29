'use client'

import { useState, useEffect } from 'react'
import { 
  PlusIcon, 
  MagnifyingGlassIcon, 
  PencilIcon, 
  TrashIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  Squares2X2Icon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { ISICNode } from '@/types'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'

// Mock data - ISIC Rev 4 Structure
const mockISICData: ISICNode[] = [
  {
    id: 1,
    parent_id: undefined,
    title_fa: 'کشاورزی، جنگلداری و ماهیگیری',
    title_en: 'Agriculture, forestry and fishing',
    title_short: 'کشاورزی',
    isic_code: 'A',
    level: '1',
    status: 'active',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    children: [
      {
        id: 2,
        parent_id: 1,
        title_fa: 'کشاورزی و باغداری',
        title_en: 'Crop and animal production, hunting and related service activities',
        title_short: 'کشاورزی',
        isic_code: '01',
        level: '2',
        status: 'active',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        children: [
          {
            id: 3,
            parent_id: 2,
            title_fa: 'کشت محصولات یکساله',
            title_en: 'Growing of non-perennial crops',
            title_short: 'محصولات یکساله',
            isic_code: '011',
            level: '3',
            status: 'active',
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
            children: [
              {
                id: 4,
                parent_id: 3,
                title_fa: 'کشت غلات (به جز برنج)، حبوبات و دانه‌های روغنی',
                title_en: 'Growing of cereals (except rice), leguminous crops and oil seeds',
                title_short: 'غلات و حبوبات',
                isic_code: '0111',
                level: '4',
                status: 'active',
                created_at: '2024-01-01T00:00:00Z',
                updated_at: '2024-01-01T00:00:00Z',
                children: [
                  {
                    id: 5,
                    parent_id: 4,
                    title_fa: 'کشت گندم',
                    title_en: 'Growing of wheat',
                    title_short: 'گندم',
                    isic_code: '01111',
                    level: '5',
                    status: 'active',
                    created_at: '2024-01-01T00:00:00Z',
                    updated_at: '2024-01-01T00:00:00Z'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 6,
    parent_id: undefined,
    title_fa: 'استخراج معدن و استخراج',
    title_en: 'Mining and quarrying',
    title_short: 'معدن',
    isic_code: 'B',
    level: '1',
    status: 'active',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    children: [
      {
        id: 7,
        parent_id: 6,
        title_fa: 'استخراج زغال سنگ و لیگنیت',
        title_en: 'Mining of coal and lignite',
        title_short: 'زغال سنگ',
        isic_code: '05',
        level: '2',
        status: 'active',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        children: [
          {
            id: 8,
            parent_id: 7,
            title_fa: 'استخراج زغال سنگ سخت',
            title_en: 'Mining of hard coal',
            title_short: 'زغال سنگ سخت',
            isic_code: '051',
            level: '3',
            status: 'active',
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
            children: [
              {
                id: 9,
                parent_id: 8,
                title_fa: 'استخراج زغال سنگ سخت',
                title_en: 'Mining of hard coal',
                title_short: 'زغال سنگ سخت',
                isic_code: '0510',
                level: '4',
                status: 'active',
                created_at: '2024-01-01T00:00:00Z',
                updated_at: '2024-01-01T00:00:00Z',
                children: [
                  {
                    id: 10,
                    parent_id: 9,
                    title_fa: 'استخراج زغال سنگ سخت در معادن زیرزمینی',
                    title_en: 'Underground mining of hard coal',
                    title_short: 'زغال سنگ زیرزمینی',
                    isic_code: '05101',
                    level: '5',
                    status: 'active',
                    created_at: '2024-01-01T00:00:00Z',
                    updated_at: '2024-01-01T00:00:00Z'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 11,
    parent_id: undefined,
    title_fa: 'صنعت',
    title_en: 'Manufacturing',
    title_short: 'صنعت',
    isic_code: 'C',
    level: '1',
    status: 'active',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    children: [
      {
        id: 12,
        parent_id: 11,
        title_fa: 'تولید مواد غذایی',
        title_en: 'Manufacture of food products',
        title_short: 'مواد غذایی',
        isic_code: '10',
        level: '2',
        status: 'active',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        children: [
          {
            id: 13,
            parent_id: 12,
            title_fa: 'تولید گوشت و محصولات گوشتی',
            title_en: 'Manufacture of meat and meat products',
            title_short: 'گوشت',
            isic_code: '101',
            level: '3',
            status: 'active',
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
            children: [
              {
                id: 14,
                parent_id: 13,
                title_fa: 'تولید و فرآوری گوشت',
                title_en: 'Production, processing and preserving of meat',
                title_short: 'فرآوری گوشت',
                isic_code: '1011',
                level: '4',
                status: 'active',
                created_at: '2024-01-01T00:00:00Z',
                updated_at: '2024-01-01T00:00:00Z',
                children: [
                  {
                    id: 15,
                    parent_id: 14,
                    title_fa: 'تولید گوشت گاو',
                    title_en: 'Beef production',
                    title_short: 'گوشت گاو',
                    isic_code: '10111',
                    level: '5',
                    status: 'active',
                    created_at: '2024-01-01T00:00:00Z',
                    updated_at: '2024-01-01T00:00:00Z'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 16,
    parent_id: undefined,
    title_fa: 'تأمین برق، گاز، بخار و تهویه مطبوع',
    title_en: 'Electricity, gas, steam and air conditioning supply',
    title_short: 'انرژی',
    isic_code: 'D',
    level: '1',
    status: 'active',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    children: [
      {
        id: 17,
        parent_id: 16,
        title_fa: 'تأمین برق',
        title_en: 'Electricity supply',
        title_short: 'برق',
        isic_code: '35',
        level: '2',
        status: 'active',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        children: [
          {
            id: 18,
            parent_id: 17,
            title_fa: 'تولید، انتقال و توزیع برق',
            title_en: 'Electric power generation, transmission and distribution',
            title_short: 'تولید برق',
            isic_code: '351',
            level: '3',
            status: 'active',
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
            children: [
              {
                id: 19,
                parent_id: 18,
                title_fa: 'تولید برق',
                title_en: 'Electric power generation',
                title_short: 'تولید برق',
                isic_code: '3510',
                level: '4',
                status: 'active',
                created_at: '2024-01-01T00:00:00Z',
                updated_at: '2024-01-01T00:00:00Z',
                children: [
                  {
                    id: 20,
                    parent_id: 19,
                    title_fa: 'تولید برق از نیروگاه‌های حرارتی',
                    title_en: 'Thermal power generation',
                    title_short: 'نیروگاه حرارتی',
                    isic_code: '35101',
                    level: '5',
                    status: 'active',
                    created_at: '2024-01-01T00:00:00Z',
                    updated_at: '2024-01-01T00:00:00Z'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 21,
    parent_id: undefined,
    title_fa: 'آب، فاضلاب، مدیریت پسماند و فعالیت‌های پاکسازی',
    title_en: 'Water supply; sewerage, waste management and remediation activities',
    title_short: 'آب و فاضلاب',
    isic_code: 'E',
    level: '1',
    status: 'active',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    children: [
      {
        id: 22,
        parent_id: 21,
        title_fa: 'تأمین آب',
        title_en: 'Water collection, treatment and supply',
        title_short: 'آب',
        isic_code: '36',
        level: '2',
        status: 'active',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        children: [
          {
            id: 23,
            parent_id: 22,
            title_fa: 'تأمین آب',
            title_en: 'Water collection, treatment and supply',
            title_short: 'تأمین آب',
            isic_code: '360',
            level: '3',
            status: 'active',
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
            children: [
              {
                id: 24,
                parent_id: 23,
                title_fa: 'تأمین آب',
                title_en: 'Water collection, treatment and supply',
                title_short: 'تأمین آب',
                isic_code: '3600',
                level: '4',
                status: 'active',
                created_at: '2024-01-01T00:00:00Z',
                updated_at: '2024-01-01T00:00:00Z',
                children: [
                  {
                    id: 25,
                    parent_id: 24,
                    title_fa: 'تأمین آب شهری',
                    title_en: 'Urban water supply',
                    title_short: 'آب شهری',
                    isic_code: '36001',
                    level: '5',
                    status: 'active',
                    created_at: '2024-01-01T00:00:00Z',
                    updated_at: '2024-01-01T00:00:00Z'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
]

interface TreeNodeProps {
  node: ISICNode
  level: number
  onEdit: (node: ISICNode) => void
  onDelete: (nodeId: number) => void
  onAddChild: (parentId: number) => void
}

function TreeNode({ node, level, onEdit, onDelete, onAddChild }: TreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(level < 2)
  const hasChildren = node.children && node.children.length > 0

  return (
    <div className="border border-gray-200 rounded-lg mb-2">
      <div 
        className={cn(
          "flex items-center justify-between p-4 hover:bg-gray-50",
          level === 0 && "bg-gray-50 font-semibold",
          level === 1 && "bg-gray-25",
          level >= 2 && "bg-white"
        )}
        style={{ paddingRight: `${level * 20 + 16}px` }}
      >
        <div className="flex items-center space-x-2 space-x-reverse">
          {hasChildren ? (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 hover:bg-gray-200 rounded"
            >
              {isExpanded ? (
                <ChevronDownIcon className="h-4 w-4" />
              ) : (
                <ChevronRightIcon className="h-4 w-4" />
              )}
            </button>
          ) : (
            <div className="w-6" />
          )}
          
          <Squares2X2Icon className="h-5 w-5 text-gray-400" />
          
          <div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <span className="font-medium text-gray-900">{node.title_fa}</span>
              <span className="text-sm text-gray-500">({node.isic_code})</span>
              <span className={cn(
                "inline-flex px-2 py-1 text-xs font-semibold rounded-full",
                node.status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : node.status === 'inactive'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              )}>
                {node.status === 'active' ? 'فعال' : node.status === 'inactive' ? 'غیرفعال' : 'حذف شده'}
              </span>
            </div>
            {node.title_en && (
              <div className="text-sm text-gray-500 mt-1">{node.title_en}</div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2 space-x-reverse">
          <button
            onClick={() => onAddChild(node.id)}
            className="text-green-600 hover:text-green-900 p-1"
            title="افزودن زیرشاخه"
          >
            <PlusIcon className="h-4 w-4" />
          </button>
          <button
            onClick={() => onEdit(node)}
            className="text-indigo-600 hover:text-indigo-900 p-1"
            title="ویرایش"
          >
            <PencilIcon className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(node.id)}
            className="text-red-600 hover:text-red-900 p-1"
            title="حذف"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      {hasChildren && isExpanded && (
        <div className="border-t border-gray-200">
          {node.children!.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              level={level + 1}
              onEdit={onEdit}
              onDelete={onDelete}
              onAddChild={onAddChild}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function ISICManagement() {
  const [isicData, setIsicData] = useState<ISICNode[]>([])
  const [filteredData, setFilteredData] = useState<ISICNode[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string>('')
  const [selectedLevel, setSelectedLevel] = useState<string>('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedNode, setSelectedNode] = useState<ISICNode | null>(null)
  const [parentId, setParentId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title_fa: '',
    title_en: '',
    title_short: '',
    isic_code: '',
    level: '1',
    status: 'active'
  })

  useEffect(() => {
    setIsicData(mockISICData)
    setFilteredData(mockISICData)
  }, [])

  useEffect(() => {
    let filtered = isicData

    if (searchTerm) {
      filtered = filtered.filter(node => 
        node.title_fa.includes(searchTerm) ||
        node.title_en?.includes(searchTerm) ||
        node.isic_code.includes(searchTerm)
      )
    }

    if (selectedStatus) {
      filtered = filtered.filter(node => node.status === selectedStatus)
    }

    if (selectedLevel) {
      filtered = filtered.filter(node => node.level === selectedLevel)
    }

    setFilteredData(filtered)
  }, [searchTerm, selectedStatus, selectedLevel, isicData])

  const handleEdit = (node: ISICNode) => {
    setSelectedNode(node)
    setFormData({
      title_fa: node.title_fa,
      title_en: node.title_en || '',
      title_short: node.title_short || '',
      isic_code: node.isic_code,
      level: node.level,
      status: node.status
    })
    setShowEditModal(true)
  }

  const handleDelete = (nodeId: number) => {
    const node = findNodeById(isicData, nodeId)
    if (node) {
      setSelectedNode(node)
      setShowDeleteModal(true)
    }
  }

  const handleAddChild = (parentId: number) => {
    setParentId(parentId)
    resetForm()
    setShowAddModal(true)
  }

  const handleAddRoot = () => {
    setParentId(null)
    resetForm()
    setShowAddModal(true)
  }

  const findNodeById = (nodes: ISICNode[], id: number): ISICNode | null => {
    for (const node of nodes) {
      if (node.id === id) return node
      if (node.children) {
        const found = findNodeById(node.children, id)
        if (found) return found
      }
    }
    return null
  }

  const updateNodeInTree = (nodes: ISICNode[], id: number, updatedNode: Partial<ISICNode>): ISICNode[] => {
    return nodes.map(node => {
      if (node.id === id) {
        return { ...node, ...updatedNode }
      }
      if (node.children) {
        return { ...node, children: updateNodeInTree(node.children, id, updatedNode) }
      }
      return node
    })
  }

  const deleteNodeFromTree = (nodes: ISICNode[], id: number): ISICNode[] => {
    return nodes.filter(node => {
      if (node.id === id) return false
      if (node.children) {
        node.children = deleteNodeFromTree(node.children, id)
      }
      return true
    })
  }

  const addNodeToTree = (nodes: ISICNode[], parentId: number | null, newNode: ISICNode): ISICNode[] => {
    if (parentId === null) {
      return [...nodes, newNode]
    }
    return nodes.map(node => {
      if (node.id === parentId) {
        return {
          ...node,
          children: [...(node.children || []), newNode]
        }
      }
      if (node.children) {
        return { ...node, children: addNodeToTree(node.children, parentId, newNode) }
      }
      return node
    })
  }

  const resetForm = () => {
    setFormData({
      title_fa: '',
      title_en: '',
      title_short: '',
      isic_code: '',
      level: '1',
      status: 'active'
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    if (selectedNode) {
      // Edit existing node
      const updatedData = updateNodeInTree(isicData, selectedNode.id, {
        title_fa: formData.title_fa,
        title_en: formData.title_en,
        title_short: formData.title_short,
        isic_code: formData.isic_code,
      level: formData.level as "1" | "2" | "3" | "4" | "5",
      status: formData.status as "active" | "inactive" | "deleted",
        updated_at: new Date().toISOString()
      })
      setIsicData(updatedData)
      setShowEditModal(false)
    } else {
      // Add new node
      const newNode: ISICNode = {
        id: Date.now(),
        parent_id: parentId || undefined,
        title_fa: formData.title_fa,
        title_en: formData.title_en,
        title_short: formData.title_short,
        isic_code: formData.isic_code,
      level: formData.level as "1" | "2" | "3" | "4" | "5",
      status: formData.status as "active" | "inactive" | "deleted",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      const updatedData = addNodeToTree(isicData, parentId, newNode)
      setIsicData(updatedData)
      setShowAddModal(false)
    }
    
    setSelectedNode(null)
    setParentId(null)
    resetForm()
    setLoading(false)
  }

  const confirmDelete = () => {
    if (selectedNode) {
      const updatedData = deleteNodeFromTree(isicData, selectedNode.id)
      setIsicData(updatedData)
      setShowDeleteModal(false)
      setSelectedNode(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-bold text-gray-900">مدیریت درختواره ISIC</h1>
          <p className="mt-2 text-sm text-gray-700">
            مدیریت کدها و دسته‌بندی‌های ISIC
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Button onClick={handleAddRoot}>
            <PlusIcon className="h-4 w-4 ml-2" />
            افزودن ریشه
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>فیلترها</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="search">جستجو</Label>
              <div className="relative">
                <MagnifyingGlassIcon className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="جستجو بر اساس عنوان یا کد ISIC"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">وضعیت</Label>
              <Select value={selectedStatus || undefined} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="همه" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">فعال</SelectItem>
                  <SelectItem value="inactive">غیرفعال</SelectItem>
                  <SelectItem value="deleted">حذف شده</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="level">سطح</Label>
              <Select value={selectedLevel || undefined} onValueChange={setSelectedLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="همه" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">سطح 1</SelectItem>
                  <SelectItem value="2">سطح 2</SelectItem>
                  <SelectItem value="3">سطح 3</SelectItem>
                  <SelectItem value="4">سطح 4</SelectItem>
                  <SelectItem value="5">سطح 5</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button variant="outline" className="w-full">
                پاک کردن فیلترها
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ISIC Tree */}
      <Card>
        <CardHeader>
          <CardTitle>درختواره ISIC</CardTitle>
          <CardDescription>
            ساختار سلسله‌مراتبی کدهای ISIC با 5 سطح
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredData.length === 0 ? (
            <div className="text-center py-12">
              <Squares2X2Icon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">هیچ گره‌ای یافت نشد</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || selectedStatus || selectedLevel 
                  ? 'با فیلترهای انتخاب شده هیچ گره‌ای یافت نشد.'
                  : 'شروع به افزودن گره‌های ISIC کنید.'
                }
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredData.map((node) => (
                <TreeNode
                  key={node.id}
                  node={node}
                  level={0}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onAddChild={handleAddChild}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Modal */}
      <Dialog open={showAddModal || showEditModal} onOpenChange={(open) => {
        if (!open) {
          setShowAddModal(false)
          setShowEditModal(false)
          setSelectedNode(null)
          setParentId(null)
          resetForm()
        }
      }}>
        <DialogContent className="sm:max-w-[425px]" onEscapeKeyDown={() => {
          setShowAddModal(false)
          setShowEditModal(false)
          setSelectedNode(null)
          setParentId(null)
          resetForm()
        }}>
          <DialogHeader className="text-right">
            <DialogTitle>
              {showAddModal ? 'افزودن گره جدید' : 'ویرایش گره'}
            </DialogTitle>
            <DialogDescription>
              {showAddModal ? 'اطلاعات گره جدید را وارد کنید' : 'اطلاعات گره را ویرایش کنید'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title_fa">عنوان فارسی *</Label>
              <Input
                id="title_fa"
                required
                value={formData.title_fa}
                onChange={(e) => setFormData({...formData, title_fa: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title_en">عنوان انگلیسی</Label>
              <Input
                id="title_en"
                value={formData.title_en}
                onChange={(e) => setFormData({...formData, title_en: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title_short">عنوان کوتاه</Label>
              <Input
                id="title_short"
                value={formData.title_short}
                onChange={(e) => setFormData({...formData, title_short: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="isic_code">کد ISIC *</Label>
              <Input
                id="isic_code"
                required
                placeholder="A, 01, 011, etc."
                value={formData.isic_code}
                onChange={(e) => setFormData({...formData, isic_code: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="level">سطح *</Label>
                <Select value={formData.level} onValueChange={(value) => setFormData({...formData, level: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">سطح 1</SelectItem>
                    <SelectItem value="2">سطح 2</SelectItem>
                    <SelectItem value="3">سطح 3</SelectItem>
                    <SelectItem value="4">سطح 4</SelectItem>
                    <SelectItem value="5">سطح 5</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">وضعیت *</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">فعال</SelectItem>
                    <SelectItem value="inactive">غیرفعال</SelectItem>
                    <SelectItem value="deleted">حذف شده</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowAddModal(false)
                  setShowEditModal(false)
                  setSelectedNode(null)
                  setParentId(null)
                  resetForm()
                }}
              >
                انصراف
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'در حال ذخیره...' : (showAddModal ? 'افزودن' : 'ویرایش')}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={showDeleteModal} onOpenChange={(open) => {
        if (!open) {
          setShowDeleteModal(false)
          setSelectedNode(null)
        }
      }}>
        <DialogContent className="sm:max-w-[425px]" onEscapeKeyDown={() => {
          setShowDeleteModal(false)
          setSelectedNode(null)
        }}>
          <DialogHeader className="text-right">
            <DialogTitle>تأیید حذف</DialogTitle>
            <DialogDescription>
              آیا مطمئن هستید که می‌خواهید گره <strong>{selectedNode?.title_fa}</strong> را حذف کنید؟
              <br />
              <span className="text-red-600 text-sm">این عمل قابل بازگشت نیست و تمام زیرشاخه‌ها نیز حذف خواهند شد.</span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowDeleteModal(false)
                setSelectedNode(null)
              }}
            >
              انصراف
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={loading}
            >
              {loading ? 'در حال حذف...' : 'حذف'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
